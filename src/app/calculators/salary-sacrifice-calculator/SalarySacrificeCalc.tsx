"use client";

import { useState, useCallback } from "react";
import { trackCalculation } from "@/lib/analytics";

// FY2025-26 income tax brackets — Stage 3 cuts (effective 1 July 2024)
const TAX_BRACKETS = [
  { min: 0,       max: 18200,   base: 0,     rate: 0 },
  { min: 18200,   max: 45000,   base: 0,     rate: 0.16 },
  { min: 45000,   max: 135000,  base: 4288,  rate: 0.30 },
  { min: 135000,  max: 190000,  base: 31288, rate: 0.37 },
  { min: 190000,  max: Infinity,base: 51638, rate: 0.45 },
];

// Medicare levy: 2% above low-income threshold (simplified)
const MEDICARE_LEVY = 0.02;

// Fringe Benefits Tax rate (grossed-up, employer cost)
const FBT_RATE = 0.47;
// FBT gross-up factor for GST-creditable benefits (Type 1)
const FBT_GROSSUP_TYPE1 = 2.0802;

function calcIncomeTax(income: number): number {
  if (income <= 0) return 0;
  const bracket = TAX_BRACKETS.findLast(b => income > b.min);
  if (!bracket) return 0;
  return bracket.base + (income - bracket.min) * bracket.rate;
}

function calcMedicare(income: number): number {
  // Simplified: 2% above $26,000
  if (income < 26000) return 0;
  return income * MEDICARE_LEVY;
}

function calcTotalTax(income: number): number {
  return calcIncomeTax(income) + calcMedicare(income);
}

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: decimals });
}

export default function SalarySacrificeCalc() {
  const [grossSalary, setGrossSalary] = useState("95000");
  const [sacrificeType, setSacrificeType] = useState<"super" | "novated">("super");

  // Super sacrifice inputs
  const [superSacrifice, setSuperSacrifice] = useState("10000");

  // Novated lease inputs
  const [vehiclePrice, setVehiclePrice] = useState("45000");
  const [annualKm, setAnnualKm] = useState("15000");
  const [leaseTermYears, setLeaseTermYears] = useState("3");
  const [isEv, setIsEv] = useState(false);

  const [result, setResult] = useState<null | {
    type: "super" | "novated";
    grossSalary: number;
    taxWithout: number;
    takeHomeWithout: number;
    sacrificeAmount: number;
    taxableIncome: number;
    taxWith: number;
    takeHomeWith: number;
    annualSaving: number;
    netCost: number;
    effectiveRate: number;
    breakdown: Record<string, number>;
  }>(null);

  const calculate = useCallback(() => {
    const salary = parseFloat(grossSalary) || 0;
    const taxWithout = calcTotalTax(salary);
    const takeHomeWithout = salary - taxWithout;

    if (sacrificeType === "super") {
      const sacrifice = parseFloat(superSacrifice) || 0;
      // Concessional contributions cap FY2025-26: $30,000
      const cappedSacrifice = Math.min(sacrifice, 30000);
      const taxableIncome = Math.max(0, salary - cappedSacrifice);
      const taxWith = calcTotalTax(taxableIncome);
      // Super fund pays 15% contributions tax on sacrificed amount
      const superTax = cappedSacrifice * 0.15;
      const takeHomeWith = taxableIncome - taxWith;
      const annualSaving = (takeHomeWithout - takeHomeWith) - (cappedSacrifice - superTax);
      // Actually the saving is: tax reduction minus super tax
      const taxReduction = taxWithout - taxWith;
      const netBenefit = taxReduction - superTax;

      setResult({
        type: "super",
        grossSalary: salary,
        taxWithout,
        takeHomeWithout,
        sacrificeAmount: cappedSacrifice,
        taxableIncome,
        taxWith,
        takeHomeWith,
        annualSaving: netBenefit,
        netCost: cappedSacrifice - netBenefit,
        effectiveRate: cappedSacrifice > 0 ? (netBenefit / cappedSacrifice) * 100 : 0,
        breakdown: {
          "Gross salary": salary,
          "Salary sacrificed to super": -cappedSacrifice,
          "Taxable income": taxableIncome,
          "Income tax + Medicare (before)": taxWithout,
          "Income tax + Medicare (after)": taxWith,
          "Tax saving": taxReduction,
          "Super contributions tax (15%)": -superTax,
          "Net benefit": netBenefit,
        },
      });
    } else {
      // Novated lease calculation
      const price = parseFloat(vehiclePrice) || 0;
      const km = parseFloat(annualKm) || 0;
      const years = parseFloat(leaseTermYears) || 3;

      // ATO cents per km rates for operating costs (simplified)
      // Running costs (fuel/charge, rego, insurance, tyres, maintenance)
      const runningCostPerKm = isEv ? 0.09 : 0.18; // EV much cheaper to run
      const annualRunningCosts = km * runningCostPerKm;

      // Lease payment (approximate: price / lease term + interest ~7%)
      // Using simple annualised cost including residual value (30% for 3yr)
      const residualRate = years === 1 ? 0.65 : years === 2 ? 0.50 : years === 3 ? 0.35 : 0.25;
      const residualValue = price * residualRate;
      const totalLeaseCost = price - residualValue;
      // Add financing cost ~7% p.a. on outstanding balance
      const financingCost = price * 0.07 * years * 0.6; // approx avg balance
      const annualLeaseCost = (totalLeaseCost + financingCost) / years;
      const totalAnnualCost = annualLeaseCost + annualRunningCosts;

      // FBT: EVs under luxury threshold are FBT-exempt from 1 July 2022
      // Non-EVs attract FBT unless employee contributes post-tax
      // For simplicity: EV = no FBT; non-EV uses ECM (employee contribution method to eliminate FBT)
      // ECM: employee makes post-tax contribution equal to FBT taxable value
      // Statutory formula: 20% of car's base value per year
      const statutoryValue = price * 0.20;
      const fbtTaxableValue = isEv ? 0 : statutoryValue;
      const fbtCost = isEv ? 0 : fbtTaxableValue * FBT_GROSSUP_TYPE1 * FBT_RATE;

      // With novated lease: salary is reduced by annual package cost (pre-tax component)
      // Pre-tax salary sacrifice = lease cost + running costs (minus any FBT post-tax portion)
      const preTaxSacrifice = isEv
        ? totalAnnualCost  // full amount pre-tax for EV
        : totalAnnualCost; // simplified (ECM post-tax portion handled by employer)

      const taxableIncome = Math.max(0, salary - preTaxSacrifice);
      const taxWith = calcTotalTax(taxableIncome);
      const taxReduction = taxWithout - taxWith;
      const takeHomeWith = taxableIncome - taxWith;

      // Cost comparison: paying for car out of after-tax income
      const afterTaxCostIfPaid = totalAnnualCost; // same dollar cost but from after-tax
      const taxEfficiencyBenefit = taxReduction;

      setResult({
        type: "novated",
        grossSalary: salary,
        taxWithout,
        takeHomeWithout,
        sacrificeAmount: preTaxSacrifice,
        taxableIncome,
        taxWith,
        takeHomeWith,
        annualSaving: taxReduction,
        netCost: totalAnnualCost - taxReduction,
        effectiveRate: totalAnnualCost > 0 ? (taxReduction / totalAnnualCost) * 100 : 0,
        breakdown: {
          "Vehicle price": price,
          "Annual lease cost (est.)": annualLeaseCost,
          "Annual running costs": annualRunningCosts,
          "Total annual package cost": totalAnnualCost,
          "Pre-tax salary sacrifice": -preTaxSacrifice,
          "Tax saving (income tax + Medicare)": taxReduction,
          "FBT liability (employer)": fbtCost,
          "Net annual cost after tax saving": totalAnnualCost - taxReduction,
        },
      });
    }

    trackCalculation("salary-sacrifice-calculator", {
      type: sacrificeType,
      gross_salary: parseFloat(grossSalary) || 0,
    });
  }, [grossSalary, sacrificeType, superSacrifice, vehiclePrice, annualKm, leaseTermYears, isEv]);

  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      {/* Type selector */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSacrificeType("super")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${sacrificeType === "super" ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
        >
          Super Salary Sacrifice
        </button>
        <button
          onClick={() => setSacrificeType("novated")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${sacrificeType === "novated" ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
        >
          Novated Lease
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Gross Annual Salary</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={grossSalary} onChange={e => setGrossSalary(e.target.value)}
              className={inputClass + " pl-6"} placeholder="95000" min="0" />
          </div>
        </div>

        {sacrificeType === "super" ? (
          <div>
            <label className={labelClass}>Annual Super Salary Sacrifice Amount</label>
            <p className="text-xs text-gray-500 mb-1">Concessional cap: $30,000 (FY2025-26)</p>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
              <input type="number" value={superSacrifice} onChange={e => setSuperSacrifice(e.target.value)}
                className={inputClass + " pl-6"} placeholder="10000" min="0" max="30000" />
            </div>
          </div>
        ) : (
          <>
            <div>
              <label className={labelClass}>Vehicle Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)}
                  className={inputClass + " pl-6"} placeholder="45000" min="0" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Annual Kilometres Driven</label>
              <input type="number" value={annualKm} onChange={e => setAnnualKm(e.target.value)}
                className={inputClass} placeholder="15000" min="0" />
            </div>
            <div>
              <label className={labelClass}>Lease Term</label>
              <select value={leaseTermYears} onChange={e => setLeaseTermYears(e.target.value)} className={inputClass}>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <input type="checkbox" id="ev" checked={isEv}
                onChange={e => setIsEv(e.target.checked)} className="w-4 h-4 accent-orange-500" />
              <label htmlFor="ev" className="text-sm text-gray-700 dark:text-gray-300">
                Electric vehicle (EV) — FBT exempt
              </label>
            </div>
          </>
        )}
      </div>

      <button onClick={calculate}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
        Calculate Tax Saving
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Salary sacrificed</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(result.sacrificeAmount)}</p>
              <p className="text-xs text-gray-400">per year (pre-tax)</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Tax saving</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(result.annualSaving)}</p>
              <p className="text-xs text-gray-400">per year</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Taxable income</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.taxableIncome)}</p>
              <p className="text-xs text-gray-400">reduced from {fmt(result.grossSalary)}</p>
            </div>
          </div>

          {/* Before/after comparison */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Before vs After Salary Sacrifice</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">WITHOUT salary sacrifice</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Gross income</span>
                    <span className="font-medium">{fmt(result.grossSalary)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax + Medicare</span>
                    <span className="text-red-500">−{fmt(result.taxWithout)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 mt-1 border-gray-200 dark:border-gray-600">
                    <span className="font-medium">Take-home</span>
                    <span className="font-bold">{fmt(result.takeHomeWithout)}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">WITH salary sacrifice</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Taxable income</span>
                    <span className="font-medium">{fmt(result.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax + Medicare</span>
                    <span className="text-red-500">−{fmt(result.taxWith)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 mt-1 border-gray-200 dark:border-gray-600">
                    <span className="font-medium">Take-home</span>
                    <span className="font-bold">{fmt(result.takeHomeWith)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Full Breakdown</h3>
            {Object.entries(result.breakdown).map(([label, value]) => (
              <div key={label} className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-600 last:border-0">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-medium ${value < 0 ? "text-red-500" : value > 0 ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                  {value < 0 ? `−${fmt(Math.abs(value))}` : fmt(value)}
                </span>
              </div>
            ))}
          </div>

          {sacrificeType === "super" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-sm text-blue-800 dark:text-blue-300">
              <strong>Super salary sacrifice note:</strong> The $30,000 concessional cap (FY2025-26) includes your employer&apos;s compulsory SG contributions (11.5%). Contributions above the cap are taxed at your marginal rate. Sacrificed amounts are taxed at 15% inside the fund.
            </div>
          )}

          {sacrificeType === "novated" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-sm text-blue-800 dark:text-blue-300">
              <strong>Novated lease note:</strong> {isEv
                ? "Electric vehicles under the luxury car tax threshold are currently FBT-exempt under the Electric Car Discount Act 2022."
                : "Non-EV novated leases may attract FBT — your employer typically uses the Employee Contribution Method (ECM) to eliminate FBT, requiring a post-tax contribution. Consult your fleet provider."
              } Figures are estimates — actual savings depend on your employer&apos;s plan, vehicle selection, and finance rate.
            </div>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
            FY2025–26 tax rates. Estimates only — consult a registered tax agent or financial adviser before making salary sacrifice decisions.
          </p>
        </div>
      )}
    </div>
  );
}
