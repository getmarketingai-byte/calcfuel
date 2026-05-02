"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

interface VehicleResult {
  label: string;
  icon: string;
  costPerMile: number;
  annualCost: number;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export default function HydrogenVsGasCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");

  // Hydrogen inputs
  const [h2Price, setH2Price] = useState("16");
  const [h2Economy, setH2Economy] = useState("66");

  // Gasoline inputs
  const [gasPrice, setGasPrice] = useState("3.50");
  const [gasMpg, setGasMpg] = useState("30");

  // Electric inputs
  const [electricityRate, setElectricityRate] = useState("0.13");
  const [evEfficiency, setEvEfficiency] = useState("3.5");

  // Shared
  const [annualDistance, setAnnualDistance] = useState("12000");

  const [results, setResults] = useState<VehicleResult[] | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const dist = parseFloat(annualDistance);
      const hp = parseFloat(h2Price);
      const he = parseFloat(h2Economy);
      const gp = parseFloat(gasPrice);
      const gmpg = parseFloat(gasMpg);
      const er = parseFloat(electricityRate);
      const eveff = parseFloat(evEfficiency);

      if (!dist || !hp || !he || !gp || !gmpg || !er || !eveff) {
        setResults(null);
        return;
      }

      let h2CostPerUnit: number;
      let gasCostPerUnit: number;
      let evCostPerUnit: number;

      if (unit === "imperial") {
        // Hydrogen: $/kg ÷ miles/kg = $/mile
        h2CostPerUnit = hp / he;
        // Gas: $/gal ÷ MPG = $/mile
        gasCostPerUnit = gp / gmpg;
        // EV: $/kWh ÷ miles/kWh = $/mile
        evCostPerUnit = er / eveff;
      } else {
        // Hydrogen: $/kg ÷ km/kg = $/km
        h2CostPerUnit = hp / he;
        // Gas: L/100km * $/L / 100 = $/km
        gasCostPerUnit = (gmpg / 100) * gp;
        // EV: kWh/100km * $/kWh / 100 = $/km
        evCostPerUnit = (eveff / 100) * er;
      }

      const h2Annual = h2CostPerUnit * dist;
      const gasAnnual = gasCostPerUnit * dist;
      const evAnnual = evCostPerUnit * dist;

      const vehicles: VehicleResult[] = [
        {
          label: "Hydrogen Fuel Cell",
          icon: "💧",
          costPerMile: h2CostPerUnit,
          annualCost: h2Annual,
          color: "blue",
          bgClass: "bg-blue-50 dark:bg-blue-950",
          borderClass: "border-blue-200 dark:border-blue-800",
          textClass: "text-blue-600 dark:text-blue-400",
        },
        {
          label: "Gasoline",
          icon: "⛽",
          costPerMile: gasCostPerUnit,
          annualCost: gasAnnual,
          color: "orange",
          bgClass: "bg-orange-50 dark:bg-orange-950",
          borderClass: "border-orange-200 dark:border-orange-800",
          textClass: "text-orange-500",
        },
        {
          label: "Electric",
          icon: "⚡",
          costPerMile: evCostPerUnit,
          annualCost: evAnnual,
          color: "green",
          bgClass: "bg-green-50 dark:bg-green-950",
          borderClass: "border-green-200 dark:border-green-800",
          textClass: "text-green-600 dark:text-green-400",
        },
      ].sort((a, b) => a.annualCost - b.annualCost);

      setResults(vehicles);

      trackCalculation("hydrogen_vs_gas", {
        unit,
        annual_distance: dist,
        h2_annual: parseFloat(h2Annual.toFixed(0)),
        gas_annual: parseFloat(gasAnnual.toFixed(0)),
        ev_annual: parseFloat(evAnnual.toFixed(0)),
        cheapest: vehicles[0].label,
      });
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [unit, annualDistance, h2Price, h2Economy, gasPrice, gasMpg, electricityRate, evEfficiency]);

  // Reset defaults on unit toggle
  function handleUnitChange(newUnit: Unit) {
    setUnit(newUnit);
    if (newUnit === "imperial") {
      setH2Price("16");
      setH2Economy("66");
      setGasPrice("3.50");
      setGasMpg("30");
      setElectricityRate("0.13");
      setEvEfficiency("3.5");
      setAnnualDistance("12000");
    } else {
      setH2Price("25");
      setH2Economy("106");
      setGasPrice("1.85");
      setGasMpg("7.8");
      setElectricityRate("0.25");
      setEvEfficiency("18");
      setAnnualDistance("19000");
    }
  }

  const distLabel = unit === "imperial" ? "miles" : "km";
  const fuelLabel = unit === "imperial" ? "gallon" : "litre";
  const currencyLabel = unit === "imperial" ? "USD" : "AUD";
  const inputCls =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat(unit === "imperial" ? "en-US" : "en-AU", {
      style: "currency",
      currency: currencyLabel,
      maximumFractionDigits: 0,
    }).format(n);

  const fmtCost = (n: number) =>
    new Intl.NumberFormat(unit === "imperial" ? "en-US" : "en-AU", {
      style: "currency",
      currency: currencyLabel,
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(n);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + unit toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hydrogen vs Gas vs Electric</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button
            onClick={() => handleUnitChange("imperial")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Miles / USD
          </button>
          <button
            onClick={() => handleUnitChange("metric")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            km / AUD
          </button>
        </div>
      </div>

      {/* Annual distance */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Annual {distLabel} Driven
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

      {/* Three-column inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hydrogen */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            💧 Hydrogen Fuel Cell
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              H₂ Price (per kg)
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={h2Price}
              onChange={(e) => setH2Price(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 16" : "e.g. 25"}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fuel Economy ({distLabel}/kg)
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={h2Economy}
              onChange={(e) => setH2Economy(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 66" : "e.g. 106"}
              className={inputCls}
            />
            <p className="text-xs text-gray-400 mt-1">Toyota Mirai: ~66 mi/kg (~106 km/kg)</p>
          </div>
        </div>

        {/* Gasoline */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            ⛽ Gasoline
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fuel Price (per {fuelLabel})
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
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
              value={gasMpg}
              onChange={(e) => setGasMpg(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 30" : "e.g. 7.8"}
              className={inputCls}
            />
          </div>
        </div>

        {/* Electric */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            ⚡ Electric
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Electricity Rate (per kWh)
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={electricityRate}
              onChange={(e) => setElectricityRate(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 0.13" : "e.g. 0.25"}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {unit === "imperial" ? "Efficiency (miles/kWh)" : "Efficiency (kWh/100km)"}
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={evEfficiency}
              onChange={(e) => setEvEfficiency(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 3.5" : "e.g. 18"}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Placeholder prompt */}
      {results === null && (
        <div className="mt-8 text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400">Enter your details above to compare fuel costs across all three vehicle types.</p>
        </div>
      )}

      {/* Results */}
      {results !== null && (
        <div className="mt-8 space-y-4" aria-live="polite">
          {/* Ranking cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {results.map((v, i) => (
              <div key={v.label} className={`p-4 rounded-xl border ${v.bgClass} ${v.borderClass}`}>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {medals[i]} {i === 0 ? "Cheapest" : i === 2 ? "Most Expensive" : "Middle"} — {v.icon} {v.label}
                </p>
                <p className={`text-2xl font-bold ${v.textClass}`}>{fmtCurrency(v.annualCost)}<span className="text-sm font-normal text-gray-500">/yr</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{fmtCost(v.costPerMile)} per {distLabel}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Vehicle Type</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Cost per {distLabel}</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Annual Fuel Cost</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">vs Cheapest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {results.map((v, i) => {
                  const extra = v.annualCost - results[0].annualCost;
                  return (
                    <tr key={v.label} className={i === 0 ? "bg-green-50 dark:bg-green-950" : ""}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {v.icon} {v.label} {i === 0 && <span className="ml-1 text-xs text-green-600 font-semibold">CHEAPEST</span>}
                      </td>
                      <td className={`px-4 py-3 text-right font-mono ${v.textClass}`}>{fmtCost(v.costPerMile)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${v.textClass}`}>{fmtCurrency(v.annualCost)}</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                        {extra === 0 ? "—" : `+${fmtCurrency(extra)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary insight */}
          <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>{results[0].icon} {results[0].label}</strong> is the cheapest option at{" "}
              <strong>{fmtCurrency(results[0].annualCost)}/year</strong>.{" "}
              {results[2].label} costs <strong>{fmtCurrency(results[2].annualCost - results[0].annualCost)}</strong> more per year.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
