"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

const MARGINAL_RATES = [
  { label: "19% ($18,201–$45,000)", value: 0.19 },
  { label: "32.5% ($45,001–$120,000)", value: 0.325 },
  { label: "37% ($120,001–$180,000)", value: 0.37 },
  { label: "45% (Over $180,000)", value: 0.45 },
];

interface GearingResult {
  annualRentalIncome: number;
  managementFee: number;
  totalExpenses: number;
  netRentalResult: number;
  taxBenefit: number;
  afterTaxHoldingCost: number;
  isNegativelyGeared: boolean;
}

interface Inputs {
  weeklyRent: number;
  mortgageInterest: number;
  councilRates: number;
  insurance: number;
  mgmtRate: number;
  maintenance: number;
  depreciation: number;
  strata: number;
  marginalRate: number;
}

function calculate(inputs: Inputs): GearingResult {
  const annualRentalIncome = inputs.weeklyRent * 52;
  const managementFee = annualRentalIncome * (inputs.mgmtRate / 100);
  const totalExpenses =
    inputs.mortgageInterest +
    inputs.councilRates +
    inputs.insurance +
    managementFee +
    inputs.maintenance +
    inputs.depreciation +
    inputs.strata;
  const netRentalResult = annualRentalIncome - totalExpenses;
  const isNegativelyGeared = netRentalResult < 0;
  const rentalLoss = isNegativelyGeared ? Math.abs(netRentalResult) : 0;
  const taxBenefit = isNegativelyGeared ? rentalLoss * inputs.marginalRate : 0;
  const afterTaxHoldingCost = isNegativelyGeared ? rentalLoss - taxBenefit : 0;
  return { annualRentalIncome, managementFee, totalExpenses, netRentalResult, taxBenefit, afterTaxHoldingCost, isNegativelyGeared };
}

export default function NegativeGearingCalc() {
  const [weeklyRent, setWeeklyRent] = useState("500");
  const [mortgageInterest, setMortgageInterest] = useState("25000");
  const [councilRates, setCouncilRates] = useState("1500");
  const [insurance, setInsurance] = useState("1200");
  const [mgmtRate, setMgmtRate] = useState("8.5");
  const [maintenance, setMaintenance] = useState("1000");
  const [depreciation, setDepreciation] = useState("3000");
  const [strata, setStrata] = useState("0");
  const [marginalRate, setMarginalRate] = useState(0.325);
  const [result, setResult] = useState<GearingResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  const pf = (s: string) => parseFloat(s) || 0;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const inputs: Inputs = {
        weeklyRent: pf(weeklyRent),
        mortgageInterest: pf(mortgageInterest),
        councilRates: pf(councilRates),
        insurance: pf(insurance),
        mgmtRate: pf(mgmtRate),
        maintenance: pf(maintenance),
        depreciation: pf(depreciation),
        strata: pf(strata),
        marginalRate,
      };
      if (inputs.weeklyRent <= 0) { setResult(null); return; }
      const r = calculate(inputs);
      setResult(r);
      trackCalculation("negative_gearing", {
        rental_income: r.annualRentalIncome,
        total_expenses: r.totalExpenses,
        rental_loss: r.isNegativelyGeared ? Math.abs(r.netRentalResult) : 0,
        tax_benefit: r.taxBenefit,
      });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [weeklyRent, mortgageInterest, councilRates, insurance, mgmtRate, maintenance, depreciation, strata, marginalRate]);

  const inputClass = "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none text-sm";
  const labelClass = "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Negative Gearing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className={labelClass}>Weekly rent (AUD)</label>
          <input type="number" value={weeklyRent} onChange={(e) => setWeeklyRent(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Annual mortgage interest (AUD)</label>
          <input type="number" value={mortgageInterest} onChange={(e) => setMortgageInterest(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Council rates (annual, AUD)</label>
          <input type="number" value={councilRates} onChange={(e) => setCouncilRates(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Property insurance (annual, AUD)</label>
          <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Property management fee (%)</label>
          <input type="number" step="0.1" value={mgmtRate} onChange={(e) => setMgmtRate(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Annual maintenance / repairs (AUD)</label>
          <input type="number" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Annual depreciation (AUD)</label>
          <input type="number" value={depreciation} onChange={(e) => setDepreciation(e.target.value)} className={inputClass} />
          <p className="text-xs text-gray-400 mt-0.5">From a quantity surveyor report</p>
        </div>
        <div>
          <label className={labelClass}>Strata / body corporate (annual, AUD)</label>
          <input type="number" value={strata} onChange={(e) => setStrata(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Your marginal tax rate</label>
          <select value={marginalRate} onChange={(e) => setMarginalRate(parseFloat(e.target.value))} className={inputClass}>
            {MARGINAL_RATES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="space-y-4 mt-2" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Annual Rental Income</p>
              <p className="text-xl font-bold text-blue-600">{fmt(result.annualRentalIncome)}</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Total Expenses</p>
              <p className="text-xl font-bold text-red-600">{fmt(result.totalExpenses)}</p>
            </div>
            <div className={`p-4 rounded-xl border ${result.isNegativelyGeared ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800" : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"}`}>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                {result.isNegativelyGeared ? "Rental Loss" : "Rental Profit"}
              </p>
              <p className={`text-xl font-bold ${result.isNegativelyGeared ? "text-orange-600" : "text-green-600"}`}>
                {fmt(Math.abs(result.netRentalResult))}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Tax Benefit</p>
              <p className="text-xl font-bold text-purple-600">{fmt(result.taxBenefit)}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm space-y-1">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Expense Breakdown</h3>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Mortgage interest</span><span>{fmt(pf(mortgageInterest))}</span></div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Council rates</span><span>{fmt(pf(councilRates))}</span></div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Property insurance</span><span>{fmt(pf(insurance))}</span></div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Management fee ({mgmtRate}%)</span><span>{fmt(result.managementFee)}</span></div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Maintenance / repairs</span><span>{fmt(pf(maintenance))}</span></div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Depreciation</span><span>{fmt(pf(depreciation))}</span></div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Strata / body corporate</span><span>{fmt(pf(strata))}</span></div>
          </div>

          {result.isNegativelyGeared && (
            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">After-tax holding cost:</span>{" "}
                <span className="text-green-700 dark:text-green-300 font-bold">{fmt(result.afterTaxHoldingCost)}/yr</span>
                {" "}({fmt(result.afterTaxHoldingCost / 12)}/mo) — the actual out-of-pocket cost after the tax benefit.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
