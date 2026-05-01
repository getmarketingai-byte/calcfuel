"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

export default function EvVsGasCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [years, setYears] = useState<5 | 10>(5);

  // Gas car inputs
  const [gasPrice, setGasPrice] = useState("");
  const [gasMpg, setGasMpg] = useState("");
  const [gasPurchase, setGasPurchase] = useState("");
  const [gasMaintenance, setGasMaintenance] = useState("1500");
  const [gasInsurance, setGasInsurance] = useState("1200");

  // EV inputs
  const [electricityRate, setElectricityRate] = useState("");
  const [evEfficiency, setEvEfficiency] = useState("");
  const [evPurchase, setEvPurchase] = useState("");
  const [evMaintenance, setEvMaintenance] = useState("800");
  const [evInsurance, setEvInsurance] = useState("1400");

  // Shared
  const [annualMiles, setAnnualMiles] = useState("12000");

  const [result, setResult] = useState<{
    gasTotalCost: number;
    evTotalCost: number;
    gasFuelCost: number;
    evFuelCost: number;
    savings: number;
    breakEvenYear: number | null;
  } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const am = parseFloat(annualMiles);
      const gp = parseFloat(gasPrice);
      const gmpg = parseFloat(gasMpg);
      const gpurch = parseFloat(gasPurchase);
      const gmaint = parseFloat(gasMaintenance) || 0;
      const gins = parseFloat(gasInsurance) || 0;
      const er = parseFloat(electricityRate);
      const eeff = parseFloat(evEfficiency);
      const epurch = parseFloat(evPurchase);
      const emaint = parseFloat(evMaintenance) || 0;
      const eins = parseFloat(evInsurance) || 0;

      if (!annualMiles && !gasPrice && !gasMpg) { setResult(null); return; }
      if (!am || !gp || !gmpg || !gpurch || !er || !eeff || !epurch) { setResult(null); return; }

      let gasFuelPerYear: number;
      let evFuelPerYear: number;

      if (unit === "imperial") {
        // Gas: miles / MPG * price/gal
        gasFuelPerYear = (am / gmpg) * gp;
        // EV: miles * (kWh/mile) * rate; eeff = miles per kWh
        evFuelPerYear = (am / eeff) * er;
      } else {
        // Gas: (L/100km) * km / 100 * price/litre
        gasFuelPerYear = (gmpg / 100) * am * gp;
        // EV: kWh/100km * km / 100 * rate
        evFuelPerYear = (eeff / 100) * am * er;
      }

      const gasAnnualOps = gasFuelPerYear + gmaint + gins;
      const evAnnualOps = evFuelPerYear + emaint + eins;

      const gasTotalCost = gpurch + gasAnnualOps * years;
      const evTotalCost = epurch + evAnnualOps * years;
      const savings = gasTotalCost - evTotalCost;

      // Break-even year: find year where cumulative EV cost <= cumulative gas cost
      const priceDiff = epurch - gpurch;
      const annualSavings = gasAnnualOps - evAnnualOps;
      let breakEvenYear: number | null = null;
      if (annualSavings > 0) {
        const be = priceDiff / annualSavings;
        if (be > 0 && be <= 20) breakEvenYear = Math.ceil(be);
      } else if (priceDiff <= 0) {
        breakEvenYear = 0;
      }

      setResult({ gasTotalCost, evTotalCost, gasFuelCost: gasFuelPerYear * years, evFuelCost: evFuelPerYear * years, savings, breakEvenYear });
      trackCalculation("ev_vs_gas", { unit, years, annual_miles: am, gas_total: parseFloat(gasTotalCost.toFixed(0)), ev_total: parseFloat(evTotalCost.toFixed(0)), savings: parseFloat(savings.toFixed(0)) });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [unit, years, annualMiles, gasPrice, gasMpg, gasPurchase, gasMaintenance, gasInsurance, electricityRate, evEfficiency, evPurchase, evMaintenance, evInsurance]);

  const fmt = (n: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
  const inputCls = "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">EV vs Gas Cost Comparison</h2>
        <div className="flex gap-3">
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
            <button onClick={() => setUnit("imperial")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Miles</button>
            <button onClick={() => setUnit("metric")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>km</button>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
            <button onClick={() => setYears(5)} className={"px-3 py-1.5 font-medium transition-colors " + (years === 5 ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>5 Years</button>
            <button onClick={() => setYears(10)} className={"px-3 py-1.5 font-medium transition-colors " + (years === 10 ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>10 Years</button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Annual {unit === "imperial" ? "Miles" : "km"} Driven
        </label>
        <input type="number" inputMode="numeric" min="0" value={annualMiles} onChange={e => setAnnualMiles(e.target.value)}
          placeholder={unit === "imperial" ? "e.g. 12000" : "e.g. 19000"} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Gas Car */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">⛽ Gas Vehicle</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purchase Price</label>
            <input type="number" inputMode="numeric" min="0" value={gasPurchase} onChange={e => setGasPurchase(e.target.value)} placeholder="e.g. 28000" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {unit === "imperial" ? "Fuel Economy (MPG)" : "Fuel Economy (L/100km)"}
            </label>
            <input type="number" inputMode="decimal" min="0" step="0.1" value={gasMpg} onChange={e => setGasMpg(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 30" : "e.g. 8"} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {unit === "imperial" ? "Gas Price (per gallon)" : "Fuel Price (per litre)"}
            </label>
            <input type="number" inputMode="decimal" min="0" step="0.01" value={gasPrice} onChange={e => setGasPrice(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Maintenance</label>
            <input type="number" inputMode="numeric" min="0" value={gasMaintenance} onChange={e => setGasMaintenance(e.target.value)} placeholder="e.g. 1500" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Insurance</label>
            <input type="number" inputMode="numeric" min="0" value={gasInsurance} onChange={e => setGasInsurance(e.target.value)} placeholder="e.g. 1200" className={inputCls} />
          </div>
        </div>

        {/* EV */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">⚡ Electric Vehicle</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purchase Price</label>
            <input type="number" inputMode="numeric" min="0" value={evPurchase} onChange={e => setEvPurchase(e.target.value)} placeholder="e.g. 42000" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {unit === "imperial" ? "Efficiency (miles per kWh)" : "Efficiency (kWh/100km)"}
            </label>
            <input type="number" inputMode="decimal" min="0" step="0.1" value={evEfficiency} onChange={e => setEvEfficiency(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 4" : "e.g. 18"} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Electricity Rate (per kWh)</label>
            <input type="number" inputMode="decimal" min="0" step="0.01" value={electricityRate} onChange={e => setElectricityRate(e.target.value)} placeholder="e.g. 0.13" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Maintenance</label>
            <input type="number" inputMode="numeric" min="0" value={evMaintenance} onChange={e => setEvMaintenance(e.target.value)} placeholder="e.g. 800" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Insurance</label>
            <input type="number" inputMode="numeric" min="0" value={evInsurance} onChange={e => setEvInsurance(e.target.value)} placeholder="e.g. 1400" className={inputCls} />
          </div>
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 space-y-4" aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">⛽ Gas Vehicle ({years}-Year Total)</p>
              <p className="text-3xl font-bold text-orange-500">{fmt(result.gasTotalCost)}</p>
              <p className="text-xs text-gray-500 mt-1">Fuel: {fmt(result.gasFuelCost)} over {years} yrs</p>
            </div>
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">⚡ EV ({years}-Year Total)</p>
              <p className="text-3xl font-bold text-blue-600">{fmt(result.evTotalCost)}</p>
              <p className="text-xs text-gray-500 mt-1">Charging: {fmt(result.evFuelCost)} over {years} yrs</p>
            </div>
          </div>
          <div className={`p-4 rounded-xl border ${result.savings >= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {result.savings >= 0 ? "EV Saves Over " + years + " Years" : "Gas Car Saves Over " + years + " Years"}
            </p>
            <p className={`text-3xl font-bold ${result.savings >= 0 ? "text-green-600" : "text-red-500"}`}>{fmt(Math.abs(result.savings))}</p>
            {result.breakEvenYear !== null && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Break-even: {result.breakEvenYear === 0 ? "Immediate (EV costs less upfront)" : `Year ${result.breakEvenYear}`}
              </p>
            )}
            {result.breakEvenYear === null && result.savings < 0 && (
              <p className="text-sm text-gray-500 mt-1">Gas car is cheaper over this period</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
