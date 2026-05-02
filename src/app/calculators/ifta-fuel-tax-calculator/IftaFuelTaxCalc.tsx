"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

interface Jurisdiction {
  name: string;
  miles: string;
  taxRate: string; // cents per gallon or litre
}

interface JurisdictionResult {
  name: string;
  milesOrKm: number;
  fuelConsumed: number; // gallons or litres
  taxDue: number; // dollars
  fuelPurchasedCredit: number; // simplified: 0 for non-home juris
}

interface CalcResult {
  avgEfficiency: number; // MPG or km/L
  totalFuelConsumed: number;
  jurisdictionResults: JurisdictionResult[];
  totalTaxDue: number;
  creditFromPurchases: number;
  netBalance: number; // positive = owe, negative = refund
}

const DEFAULT_JURISDICTIONS: Jurisdiction[] = [
  { name: "Home State", miles: "", taxRate: "24.4" },
  { name: "Jurisdiction 2", miles: "", taxRate: "" },
  { name: "Jurisdiction 3", miles: "", taxRate: "" },
];

export default function IftaFuelTaxCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");

  // Fleet totals
  const [totalMiles, setTotalMiles] = useState("");
  const [totalFuelPurchased, setTotalFuelPurchased] = useState("");
  const [homeTaxRate, setHomeTaxRate] = useState("24.4"); // cents/gallon default (avg US)

  // Jurisdiction rows
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>(DEFAULT_JURISDICTIONS);
  const [activeJurisdictions, setActiveJurisdictions] = useState(1);

  const [result, setResult] = useState<CalcResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const totalDist = parseFloat(totalMiles);
      const totalFuel = parseFloat(totalFuelPurchased);

      if (!totalDist || !totalFuel || totalDist <= 0 || totalFuel <= 0) {
        setResult(null);
        return;
      }

      // Average fleet efficiency
      let avgEfficiency: number;
      if (unit === "imperial") {
        avgEfficiency = totalDist / totalFuel; // MPG
      } else {
        // km/L
        avgEfficiency = totalDist / totalFuel;
      }

      // Process active jurisdictions
      const activeJuris = jurisdictions.slice(0, activeJurisdictions);
      const jurResults: JurisdictionResult[] = [];
      let totalTaxDue = 0;

      for (const j of activeJuris) {
        const jMiles = parseFloat(j.miles);
        const jRate = parseFloat(j.taxRate); // cents per gallon or litre

        if (!jMiles || !jRate || jMiles <= 0) continue;

        // Fuel consumed in this jurisdiction
        const fuelConsumed = jMiles / avgEfficiency;

        // Tax due = fuel consumed * tax rate (convert cents to dollars)
        const taxDue = fuelConsumed * (jRate / 100);

        jurResults.push({
          name: j.name || `Jurisdiction ${jurResults.length + 1}`,
          milesOrKm: jMiles,
          fuelConsumed,
          taxDue,
          fuelPurchasedCredit: 0,
        });

        totalTaxDue += taxDue;
      }

      if (jurResults.length === 0) {
        setResult(null);
        return;
      }

      // Credit: taxes paid on fuel purchased (all assumed purchased in home state for simplicity)
      // Home state tax rate applies to total fuel purchased
      const homeRate = parseFloat(homeTaxRate) || 0;
      const creditFromPurchases = totalFuel * (homeRate / 100);

      // Net balance: positive = owe, negative = refund
      const netBalance = totalTaxDue - creditFromPurchases;

      const calcResult: CalcResult = {
        avgEfficiency,
        totalFuelConsumed: totalDist / avgEfficiency,
        jurisdictionResults: jurResults,
        totalTaxDue,
        creditFromPurchases,
        netBalance,
      };

      setResult(calcResult);
      trackCalculation("ifta_fuel_tax", {
        unit,
        total_miles: totalDist,
        total_fuel: totalFuel,
        avg_efficiency: parseFloat(avgEfficiency.toFixed(2)),
        total_tax_due: parseFloat(totalTaxDue.toFixed(2)),
        net_balance: parseFloat(netBalance.toFixed(2)),
        jurisdictions_count: jurResults.length,
      });
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [unit, totalMiles, totalFuelPurchased, homeTaxRate, jurisdictions, activeJurisdictions]);

  const updateJurisdiction = (index: number, field: keyof Jurisdiction, value: string) => {
    setJurisdictions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const distLabel = unit === "imperial" ? "miles" : "km";
  const fuelLabel = unit === "imperial" ? "gallons" : "litres";
  const efficiencyLabel = unit === "imperial" ? "MPG" : "km/L";
  const rateLabel = unit === "imperial" ? "cents/gal" : "cents/L";

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const fmtNum = (n: number, dec = 2) => n.toFixed(dec);

  const inputCls =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";
  const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + unit toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">IFTA Quarterly Fuel Tax Estimator</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button
            onClick={() => setUnit("imperial")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Miles / Gallons
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            km / Litres
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-700 rounded-lg text-xs text-yellow-800 dark:text-yellow-300">
        <strong>Estimator only.</strong> This tool provides a simplified IFTA estimate for planning purposes. It does not account for all jurisdictions, surcharges, or credits. Always file your official quarterly IFTA return using your state&apos;s certified software or a licensed IFTA service.
      </div>

      {/* Fleet totals */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2 mb-4">
          Fleet Totals This Quarter
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Total {distLabel} Driven (all jurisdictions)</label>
            <input
              type="number" inputMode="decimal" min="0" value={totalMiles}
              onChange={e => setTotalMiles(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 28000" : "e.g. 45000"}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Total {fuelLabel} Purchased (all jurisdictions)</label>
            <input
              type="number" inputMode="decimal" min="0" value={totalFuelPurchased}
              onChange={e => setTotalFuelPurchased(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 4667" : "e.g. 17600"}
              className={inputCls}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>
              Base Jurisdiction Fuel Tax Rate ({rateLabel}) — used to calculate purchase credits
            </label>
            <input
              type="number" inputMode="decimal" min="0" step="0.1" value={homeTaxRate}
              onChange={e => setHomeTaxRate(e.target.value)}
              placeholder="e.g. 24.4"
              className={inputCls}
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Default 24.4 ¢/gal (approximate US average state fuel tax). Check your state&apos;s current IFTA rate.
            </p>
          </div>
        </div>
      </div>

      {/* Jurisdiction breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
            Jurisdiction Breakdown (up to 3)
          </h3>
          <div className="flex gap-2 text-sm">
            {activeJurisdictions < 3 && (
              <button
                onClick={() => setActiveJurisdictions(n => Math.min(n + 1, 3))}
                className="px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors font-medium"
              >
                + Add Jurisdiction
              </button>
            )}
            {activeJurisdictions > 1 && (
              <button
                onClick={() => setActiveJurisdictions(n => Math.max(n - 1, 1))}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                − Remove
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: activeJurisdictions }).map((_, i) => (
            <div key={i} className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-750">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Jurisdiction Name</label>
                  <input
                    type="text" value={jurisdictions[i].name}
                    onChange={e => updateJurisdiction(i, "name", e.target.value)}
                    placeholder={i === 0 ? "e.g. Texas" : `e.g. State ${i + 1}`}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>{distLabel} Driven in Jurisdiction</label>
                  <input
                    type="number" inputMode="decimal" min="0" value={jurisdictions[i].miles}
                    onChange={e => updateJurisdiction(i, "miles", e.target.value)}
                    placeholder={unit === "imperial" ? "e.g. 12000" : "e.g. 19000"}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Fuel Tax Rate ({rateLabel})</label>
                  <input
                    type="number" inputMode="decimal" min="0" step="0.1" value={jurisdictions[i].taxRate}
                    onChange={e => updateJurisdiction(i, "taxRate", e.target.value)}
                    placeholder="e.g. 20.0"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder prompt */}
      {result === null && (
        <div className="mt-2 text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl text-gray-400 dark:text-gray-500">
          <p className="text-sm">Enter your total miles/km, total fuel purchased, and at least one jurisdiction&apos;s miles and tax rate to see your IFTA estimate.</p>
        </div>
      )}

      {/* Results */}
      {result !== null && (
        <div className="mt-2 space-y-4" aria-live="polite">
          {/* Fleet efficiency summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fleet Avg Efficiency</p>
              <p className="text-2xl font-bold text-orange-500">{fmtNum(result.avgEfficiency, 1)} <span className="text-sm font-normal">{efficiencyLabel}</span></p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Fuel Consumed</p>
              <p className="text-2xl font-bold text-gray-700 dark:text-white">{fmtNum(result.totalFuelConsumed, 0)} <span className="text-sm font-normal">{fuelLabel}</span></p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Purchase Credit</p>
              <p className="text-2xl font-bold text-gray-700 dark:text-white">{fmt(result.creditFromPurchases)}</p>
            </div>
          </div>

          {/* Jurisdiction table */}
          {result.jurisdictionResults.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Jurisdiction</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{distLabel}</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{fuelLabel} Consumed</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tax Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {result.jurisdictionResults.map((jr, i) => (
                    <tr key={i} className="bg-white dark:bg-gray-800">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{jr.name}</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{fmtNum(jr.milesOrKm, 0)}</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{fmtNum(jr.fuelConsumed, 1)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-orange-500">{fmt(jr.taxDue)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-750 font-semibold">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Total</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">—</td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">—</td>
                    <td className="px-4 py-3 text-right text-orange-500">{fmt(result.totalTaxDue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Net balance banner */}
          <div className={`p-5 rounded-xl border ${result.netBalance > 0 ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800" : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
              Estimated IFTA Balance This Quarter
            </p>
            <p className={`text-3xl font-bold ${result.netBalance > 0 ? "text-red-600" : "text-green-600"}`}>
              {result.netBalance > 0 ? fmt(result.netBalance) + " owed" : fmt(Math.abs(result.netBalance)) + " refund"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {result.netBalance > 0
                ? `Total tax across jurisdictions: ${fmt(result.totalTaxDue)} minus purchase credits of ${fmt(result.creditFromPurchases)} = ${fmt(result.netBalance)} additional tax owed.`
                : `Total tax across jurisdictions: ${fmt(result.totalTaxDue)} minus purchase credits of ${fmt(result.creditFromPurchases)} = ${fmt(Math.abs(result.netBalance))} refund.`}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Simplified estimate. Purchase credits assume all fuel purchased in base jurisdiction at the rate entered above. Actual credits depend on fuel receipts by jurisdiction.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
