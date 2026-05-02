"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

interface Result {
  annualFuelSavings: number;
  annualTotalSavings: number;
  breakEvenMonths: number | null;
  breakEvenYears: number | null;
  savings5yr: number;
  savings10yr: number;
  hybridAnnualFuel: number;
  gasAnnualFuel: number;
  neverBreaksEven: boolean;
}

export default function HybridVsGasCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");

  const [hybridPrice, setHybridPrice] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [annualDistance, setAnnualDistance] = useState("12000");
  const [hybridEfficiency, setHybridEfficiency] = useState("");
  const [gasEfficiency, setGasEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [maintenanceSavings, setMaintenanceSavings] = useState("300");

  const [result, setResult] = useState<Result | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const hp = parseFloat(hybridPrice);
      const gp = parseFloat(gasPrice);
      const dist = parseFloat(annualDistance);
      const heff = parseFloat(hybridEfficiency);
      const geff = parseFloat(gasEfficiency);
      const fp = parseFloat(fuelPrice);
      const maint = parseFloat(maintenanceSavings) || 0;

      if (!hp || !gp || !dist || !heff || !geff || !fp || dist <= 0 || heff <= 0 || geff <= 0 || fp <= 0) {
        setResult(null);
        return;
      }

      let hybridAnnualFuel: number;
      let gasAnnualFuel: number;

      if (unit === "imperial") {
        // MPG: cost = miles / MPG * price_per_gallon
        hybridAnnualFuel = (dist / heff) * fp;
        gasAnnualFuel = (dist / geff) * fp;
      } else {
        // L/100km: cost = (L/100km / 100) * km * price_per_litre
        hybridAnnualFuel = (heff / 100) * dist * fp;
        gasAnnualFuel = (geff / 100) * dist * fp;
      }

      const annualFuelSavings = gasAnnualFuel - hybridAnnualFuel;
      const annualTotalSavings = annualFuelSavings + maint;

      const pricePremium = hp - gp;

      let breakEvenMonths: number | null = null;
      let breakEvenYears: number | null = null;
      let neverBreaksEven = false;

      if (pricePremium <= 0) {
        // Hybrid is cheaper upfront — immediately ahead
        breakEvenMonths = 0;
        breakEvenYears = 0;
      } else if (annualTotalSavings > 0) {
        const yearsRaw = pricePremium / annualTotalSavings;
        if (yearsRaw <= 30) {
          breakEvenYears = parseFloat(yearsRaw.toFixed(1));
          breakEvenMonths = Math.ceil(yearsRaw * 12);
        } else {
          neverBreaksEven = true;
        }
      } else {
        neverBreaksEven = true;
      }

      const savings5yr = annualTotalSavings * 5 - pricePremium;
      const savings10yr = annualTotalSavings * 10 - pricePremium;

      setResult({
        annualFuelSavings,
        annualTotalSavings,
        breakEvenMonths,
        breakEvenYears,
        savings5yr,
        savings10yr,
        hybridAnnualFuel,
        gasAnnualFuel,
        neverBreaksEven,
      });

      trackCalculation("hybrid_vs_gas", {
        unit,
        annual_distance: dist,
        hybrid_price: hp,
        gas_price: gp,
        price_premium: pricePremium,
        annual_fuel_savings: parseFloat(annualFuelSavings.toFixed(0)),
        annual_total_savings: parseFloat(annualTotalSavings.toFixed(0)),
        break_even_months: breakEvenMonths ?? -1,
        savings_5yr: parseFloat(savings5yr.toFixed(0)),
        savings_10yr: parseFloat(savings10yr.toFixed(0)),
        never_breaks_even: neverBreaksEven ? 1 : 0,
      });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [unit, hybridPrice, gasPrice, annualDistance, hybridEfficiency, gasEfficiency, fuelPrice, maintenanceSavings]);

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.abs(n));

  const inputCls =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";

  const breakEvenDisplay = (() => {
    if (!result) return null;
    if (result.neverBreaksEven) return null;
    if (result.breakEvenMonths === 0) return "Immediate — hybrid is already cheaper upfront";
    if (result.breakEvenMonths !== null && result.breakEvenYears !== null) {
      const yrs = Math.floor(result.breakEvenMonths / 12);
      const mos = result.breakEvenMonths % 12;
      if (yrs === 0) return `${result.breakEvenMonths} months`;
      if (mos === 0) return `${yrs} ${yrs === 1 ? "year" : "years"}`;
      return `${yrs} ${yrs === 1 ? "year" : "years"} and ${mos} ${mos === 1 ? "month" : "months"}`;
    }
    return null;
  })();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + unit toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hybrid vs Gas Break-Even Calculator</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button
            onClick={() => setUnit("imperial")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Miles / MPG
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            km / L
          </button>
        </div>
      </div>

      {/* Shared input: annual distance */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Annual {unit === "imperial" ? "Miles" : "km"} Driven
        </label>
        <input
          type="number"
          inputMode="numeric"
          min="0"
          value={annualDistance}
          onChange={(e) => setAnnualDistance(e.target.value)}
          placeholder={unit === "imperial" ? "e.g. 12000" : "e.g. 19000"}
          className={inputCls}
        />
      </div>

      {/* Two-column: Hybrid | Gas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hybrid */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Hybrid Vehicle
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              value={hybridPrice}
              onChange={(e) => setHybridPrice(e.target.value)}
              placeholder="e.g. 32000"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {unit === "imperial" ? "Fuel Economy (MPG)" : "Fuel Economy (L/100km)"}
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={hybridEfficiency}
              onChange={(e) => setHybridEfficiency(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 52" : "e.g. 4.5"}
              className={inputCls}
            />
          </div>
        </div>

        {/* Gas */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Gas Vehicle
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              placeholder="e.g. 24000"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {unit === "imperial" ? "Fuel Economy (MPG)" : "Fuel Economy (L/100km)"}
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={gasEfficiency}
              onChange={(e) => setGasEfficiency(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 32" : "e.g. 8.5"}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Shared fuel + maintenance inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Fuel Price (per gallon)" : "Fuel Price (per litre)"}
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hybrid saves annually on maintenance ($)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={maintenanceSavings}
            onChange={(e) => setMaintenanceSavings(e.target.value)}
            placeholder="e.g. 300"
            className={inputCls}
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Hybrids typically save ~$200–$500/yr on maintenance vs gas cars
          </p>
        </div>
      </div>

      {/* Results */}
      {result !== null && (
        <div className="mt-8 space-y-4" aria-live="polite">
          {/* Break-even hero card */}
          {result.neverBreaksEven ? (
            <div className="p-5 rounded-xl border bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">Break-Even Point</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                Hybrid may not break even at this mileage
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                The hybrid&apos;s fuel savings{result.annualFuelSavings > 0 ? ` of ${fmtCurrency(result.annualFuelSavings)}/yr` : ""} are not enough to offset the price premium within a typical ownership period. Try increasing annual mileage or adjusting fuel prices.
              </p>
            </div>
          ) : (
            <div className="p-5 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wide mb-1">Break-Even Point</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">{breakEvenDisplay}</p>
              {result.breakEvenMonths !== null && result.breakEvenMonths > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  After {breakEvenDisplay}, the hybrid starts saving you money every year.
                </p>
              )}
            </div>
          )}

          {/* Annual savings row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Annual Fuel Savings</p>
              <p className={`text-2xl font-bold ${result.annualFuelSavings >= 0 ? "text-blue-600" : "text-red-500"}`}>
                {result.annualFuelSavings >= 0 ? "" : "-"}{fmtCurrency(result.annualFuelSavings)}/yr
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Hybrid: {fmtCurrency(result.hybridAnnualFuel)}/yr &nbsp;|&nbsp; Gas: {fmtCurrency(result.gasAnnualFuel)}/yr
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Annual Total Savings (fuel + maintenance)</p>
              <p className={`text-2xl font-bold ${result.annualTotalSavings >= 0 ? "text-purple-600" : "text-red-500"}`}>
                {result.annualTotalSavings >= 0 ? "" : "-"}{fmtCurrency(result.annualTotalSavings)}/yr
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Includes {fmtCurrency(parseFloat(maintenanceSavings) || 0)}/yr maintenance advantage
              </p>
            </div>
          </div>

          {/* 5-year / 10-year savings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border ${result.savings5yr >= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Net Savings After 5 Years</p>
              <p className={`text-2xl font-bold ${result.savings5yr >= 0 ? "text-green-600" : "text-red-500"}`}>
                {result.savings5yr >= 0 ? "+" : "-"}{fmtCurrency(result.savings5yr)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {result.savings5yr >= 0 ? "Hybrid ahead after price premium" : "Gas car cheaper over 5 years"}
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${result.savings10yr >= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Net Savings After 10 Years</p>
              <p className={`text-2xl font-bold ${result.savings10yr >= 0 ? "text-green-600" : "text-red-500"}`}>
                {result.savings10yr >= 0 ? "+" : "-"}{fmtCurrency(result.savings10yr)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {result.savings10yr >= 0 ? "Hybrid well ahead long-term" : "Gas car still cheaper over 10 years"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
