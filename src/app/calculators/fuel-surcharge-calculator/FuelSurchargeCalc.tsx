"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Method = "formula" | "flat_rate";

interface Result {
  surchargePerMile: number;
  totalSurcharge: number;
  totalInvoice: number;
  surchargePct: number;
}

export default function FuelSurchargeCalc() {
  const [method, setMethod] = useState<Method>("formula");

  // Shared inputs
  const [baseRate, setBaseRate] = useState("");
  const [miles, setMiles] = useState("");

  // Formula-method inputs
  const [currentDiesel, setCurrentDiesel] = useState("");
  const [baselineDiesel, setBaselineDiesel] = useState("1.25");
  const [mpg, setMpg] = useState("6.5");

  // Flat-rate method input
  const [flatRate, setFlatRate] = useState("");

  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const base = parseFloat(baseRate);
      const mi = parseFloat(miles);

      // Clear state if no inputs entered yet
      const hasInput =
        baseRate || miles || (method === "formula" ? currentDiesel : flatRate);
      if (!hasInput) {
        setResult(null);
        setError("");
        return;
      }

      if (!base || base <= 0) {
        setError("Please enter a valid base freight rate ($ amount).");
        setResult(null);
        return;
      }
      if (!mi || mi <= 0) {
        setError("Please enter a valid trip distance in miles.");
        setResult(null);
        return;
      }

      let surchargePerMile: number;

      if (method === "formula") {
        const current = parseFloat(currentDiesel);
        const baseline = parseFloat(baselineDiesel);
        const economy = parseFloat(mpg);

        if (!current || current <= 0) {
          setError("Please enter the current diesel price per gallon.");
          setResult(null);
          return;
        }
        if (!baseline || baseline <= 0) {
          setError("Please enter a valid baseline diesel price.");
          setResult(null);
          return;
        }
        if (!economy || economy <= 0) {
          setError("Please enter a valid vehicle fuel economy (MPG).");
          setResult(null);
          return;
        }
        if (current <= baseline) {
          setError(
            "Current diesel price is at or below the baseline — no surcharge applies."
          );
          setResult(null);
          return;
        }
        surchargePerMile = (current - baseline) / economy;
      } else {
        const flat = parseFloat(flatRate);
        if (!flat || flat <= 0) {
          setError("Please enter a valid flat surcharge rate ($/mile).");
          setResult(null);
          return;
        }
        surchargePerMile = flat;
      }

      const totalSurcharge = surchargePerMile * mi;
      const totalInvoice = base + totalSurcharge;
      const surchargePct = (totalSurcharge / base) * 100;

      setError("");
      setResult({ surchargePerMile, totalSurcharge, totalInvoice, surchargePct });

      trackCalculation("fuel_surcharge", {
        method,
        base_rate: base,
        total_surcharge: parseFloat(totalSurcharge.toFixed(2)),
        surcharge_pct: parseFloat(surchargePct.toFixed(2)),
      });
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [method, baseRate, miles, currentDiesel, baselineDiesel, mpg, flatRate]);

  const fmt$ = (n: number) =>
    "$" +
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + method toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Fuel Surcharge Calculator
        </h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm shrink-0">
          <button
            onClick={() => setMethod("formula")}
            className={
              "px-3 py-1.5 font-medium transition-colors " +
              (method === "formula"
                ? "bg-orange-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")
            }
          >
            Per-Mile Formula
          </button>
          <button
            onClick={() => setMethod("flat_rate")}
            className={
              "px-3 py-1.5 font-medium transition-colors " +
              (method === "flat_rate"
                ? "bg-orange-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")
            }
          >
            Flat Rate per Mile
          </button>
        </div>
      </div>

      {/* Method description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
        {method === "formula"
          ? "Calculates surcharge using the standard DOE formula: (current diesel − baseline) ÷ MPG = surcharge per mile."
          : "Enter your agreed flat surcharge rate in $/mile. Useful when your carrier contract specifies a fixed per-mile FSC rate."}
      </p>

      {/* Shared inputs: Base rate + Miles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Base freight rate ($)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
              $
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={baseRate}
              onChange={(e) => setBaseRate(e.target.value)}
              placeholder="e.g. 2500"
              className={inputClass + " pl-7"}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Trip distance (miles)</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            placeholder="e.g. 500"
            className={inputClass}
          />
        </div>
      </div>

      {/* Method-specific inputs */}
      {method === "formula" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className={labelClass}>Current diesel price (per gallon)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.001"
                value={currentDiesel}
                onChange={(e) => setCurrentDiesel(e.target.value)}
                placeholder="e.g. 3.85"
                className={inputClass + " pl-7"}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Baseline diesel price (trigger point)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.001"
                value={baselineDiesel}
                onChange={(e) => setBaselineDiesel(e.target.value)}
                placeholder="e.g. 1.25"
                className={inputClass + " pl-7"}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Vehicle fuel economy (MPG)</label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={mpg}
              onChange={(e) => setMpg(e.target.value)}
              placeholder="e.g. 6.5"
              className={inputClass}
            />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="max-w-xs">
            <label className={labelClass}>Flat surcharge rate ($/mile)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.001"
                value={flatRate}
                onChange={(e) => setFlatRate(e.target.value)}
                placeholder="e.g. 0.12"
                className={inputClass + " pl-7"}
              />
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {/* Results */}
      {result !== null && (
        <div aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Surcharge per Mile
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ${result.surchargePerMile.toFixed(4)}
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Total Fuel Surcharge
              </p>
              <p className="text-2xl font-bold text-amber-600">
                {fmt$(result.totalSurcharge)}
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Total Invoice Amount
              </p>
              <p className="text-2xl font-bold text-green-600">
                {fmt$(result.totalInvoice)}
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Surcharge % of Base Rate
              </p>
              <p className="text-2xl font-bold text-orange-500">
                {result.surchargePct.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Breakdown card */}
          <div className="bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Invoice Breakdown
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Base freight rate</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {fmt$(parseFloat(baseRate))}
                </span>
              </div>
              {method === "formula" && (
                <>
                  <div className="flex justify-between text-gray-400 dark:text-gray-500 text-xs">
                    <span>
                      Diesel spread: ${parseFloat(currentDiesel).toFixed(3)} −{" "}
                      ${parseFloat(baselineDiesel).toFixed(3)} ={" "}
                      ${(parseFloat(currentDiesel) - parseFloat(baselineDiesel)).toFixed(3)}/gal
                    </span>
                    <span>÷ {parseFloat(mpg).toFixed(1)} MPG</span>
                  </div>
                  <div className="flex justify-between text-gray-400 dark:text-gray-500 text-xs">
                    <span>
                      ${result.surchargePerMile.toFixed(4)}/mile × {parseFloat(miles).toLocaleString()} miles
                    </span>
                  </div>
                </>
              )}
              {method === "flat_rate" && (
                <div className="flex justify-between text-gray-400 dark:text-gray-500 text-xs">
                  <span>
                    ${parseFloat(flatRate).toFixed(4)}/mile × {parseFloat(miles).toLocaleString()} miles
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Fuel surcharge</span>
                <span className="font-medium text-amber-600">
                  + {fmt$(result.totalSurcharge)}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
                <span>Total invoice</span>
                <span className="text-green-600">{fmt$(result.totalInvoice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
