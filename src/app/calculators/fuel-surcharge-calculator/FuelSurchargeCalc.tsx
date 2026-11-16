"use client";
import { useState, useEffect, useRef } from "react";
import { DEFAULT_DIESEL_INPUT } from "@/lib/fuel-prices";
import { trackCalculation } from "@/lib/analytics";
import { CARRIER_SURCHARGES } from "@/lib/carrier-surcharges";

type Method = "formula" | "flat_rate" | "percent";

interface Result {
  surchargePerKm: number;
  totalSurcharge: number;
  totalInvoice: number;
  surchargePct: number;
}

export default function FuelSurchargeCalc() {
  const [method, setMethod] = useState<Method>("formula");

  // Shared inputs — sample defaults so a result appears on first paint
  const [baseRate, setBaseRate] = useState("2500");
  const [km, setKm] = useState("880");

  // Formula-method inputs
  const [currentDiesel, setCurrentDiesel] = useState(DEFAULT_DIESEL_INPUT);
  const [baselineDiesel, setBaselineDiesel] = useState("1.50");
  const [l100, setL100] = useState("36");

  // Flat-rate method input
  const [flatRate, setFlatRate] = useState("0.08");

  // Percentage method (courier and parcel carriers publish a % of the freight charge)
  const [carrierId, setCarrierId] = useState(CARRIER_SURCHARGES[3].id);
  const [percentRate, setPercentRate] = useState(String(CARRIER_SURCHARGES[3].percent));
  const pickCarrier = (id: string) => {
    setCarrierId(id);
    const c = CARRIER_SURCHARGES.find((x) => x.id === id);
    if (c) setPercentRate(String(c.percent));
  };

  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const base = parseFloat(baseRate);
      const mi = parseFloat(km);

      // Clear state if no inputs entered yet
      const hasInput =
        baseRate || km || (method === "formula" ? currentDiesel : flatRate);
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
      if (method !== "percent" && (!mi || mi <= 0)) {
        setError("Please enter a valid trip distance in kilometres.");
        setResult(null);
        return;
      }

      let surchargePerKm: number;
      let percentTotal: number | null = null;

      if (method === "percent") {
        const pct = parseFloat(percentRate);
        if (!(pct >= 0) || pct > 200) {
          setError("Please enter a fuel surcharge percentage between 0 and 200.");
          setResult(null);
          return;
        }
        percentTotal = (base * pct) / 100;
        surchargePerKm = mi > 0 ? percentTotal / mi : 0;
      } else if (method === "formula") {
        const current = parseFloat(currentDiesel);
        const baseline = parseFloat(baselineDiesel);
        const economy = parseFloat(l100);

        if (!current || current <= 0) {
          setError("Please enter the current diesel price per litre.");
          setResult(null);
          return;
        }
        if (!baseline || baseline <= 0) {
          setError("Please enter a valid baseline diesel price.");
          setResult(null);
          return;
        }
        if (!economy || economy <= 0) {
          setError("Please enter the truck's fuel use in L/100km.");
          setResult(null);
          return;
        }
        if (current <= baseline) {
          // Valid business outcome: $0 surcharge — still show invoice and track
          surchargePerKm = 0;
        } else {
          surchargePerKm = ((current - baseline) * economy) / 100;
        }
      } else {
        const flat = parseFloat(flatRate);
        if (!flat || flat <= 0) {
          setError("Please enter a valid flat surcharge rate ($/km).");
          setResult(null);
          return;
        }
        surchargePerKm = flat;
      }

      const totalSurcharge = percentTotal ?? surchargePerKm * mi;
      const totalInvoice = base + totalSurcharge;
      const surchargePct = (totalSurcharge / base) * 100;
      const noSurcharge =
        method === "formula" &&
        parseFloat(currentDiesel) > 0 &&
        parseFloat(currentDiesel) <= parseFloat(baselineDiesel);

      setError("");
      setResult({ surchargePerKm, totalSurcharge, totalInvoice, surchargePct });

      trackCalculation("fuel_surcharge", {
        method,
        base_rate: base,
        total_surcharge: parseFloat(totalSurcharge.toFixed(2)),
        surcharge_pct: parseFloat(surchargePct.toFixed(2)),
        no_surcharge: noSurcharge ? 1 : 0,
      });
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [method, baseRate, km, currentDiesel, baselineDiesel, l100, flatRate, percentRate]);

  const fmt$ = (n: number) =>
    "$" +
    n.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
                ? "bg-orange-700 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")
            }
          >
            Per-km formula
          </button>
          <button
            onClick={() => setMethod("flat_rate")}
            className={
              "px-3 py-1.5 font-medium transition-colors " +
              (method === "flat_rate"
                ? "bg-orange-700 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")
            }
          >
            Flat rate per km
          </button>
          <button
            onClick={() => setMethod("percent")}
            className={
              "px-3 py-1.5 font-medium transition-colors " +
              (method === "percent"
                ? "bg-orange-700 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")
            }
          >
            Carrier % levy
          </button>
        </div>
      </div>

      {/* Method description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
        {method === "formula"
          ? "Surcharge per km = (current diesel − contract base price) × L/100km ÷ 100. Diesel starts at the latest ACCC five-city average."
          : method === "flat_rate"
            ? "Enter your agreed flat fuel surcharge in $/km, for contracts that fix the levy per kilometre."
            : "Couriers and parcel carriers add a published percentage to the freight charge. Pick a carrier's current rate or type your own; distance is optional here."}
      </p>

      {/* Shared inputs: base rate + distance (km) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Base freight rate ($)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
              $
            </span>
            <input aria-label="Base freight rate ($"
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
          <label className={labelClass}>Trip distance (km)</label>
          <input aria-label="Trip distance (km)"
            type="number"
            inputMode="decimal"
            min="0"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            placeholder="e.g. 880"
            className={inputClass}
          />
        </div>
      </div>

      {/* Method-specific inputs */}
      {method === "formula" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className={labelClass}>Current diesel price ($/L)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                $
              </span>
              <input aria-label="Current diesel price ($/L)"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.001"
                value={currentDiesel}
                onChange={(e) => setCurrentDiesel(e.target.value)}
                placeholder="e.g. 2.10"
                className={inputClass + " pl-7"}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Contract base diesel price ($/L)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                $
              </span>
              <input aria-label="Baseline diesel price (trigger point"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.001"
                value={baselineDiesel}
                onChange={(e) => setBaselineDiesel(e.target.value)}
                placeholder="e.g. 1.50"
                className={inputClass + " pl-7"}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Truck fuel use (L/100km)</label>
            <input aria-label="Truck fuel use (L/100km)"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={l100}
              onChange={(e) => setL100(e.target.value)}
              placeholder="e.g. 36"
              className={inputClass}
            />
          </div>
        </div>
      ) : method === "percent" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className={labelClass} htmlFor="carrier-preset">Carrier rate</label>
            <select
              id="carrier-preset"
              value={carrierId}
              onChange={(e) => pickCarrier(e.target.value)}
              className={inputClass}
            >
              {CARRIER_SURCHARGES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.carrier} — {c.service} ({c.percent}%)
                </option>
              ))}
              <option value="custom">My own contract rate</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="surcharge-percent">Fuel surcharge (%)</label>
            <input
              id="surcharge-percent"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={percentRate}
              onChange={(e) => {
                setPercentRate(e.target.value);
                setCarrierId("custom");
              }}
              className={inputClass}
            />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="max-w-xs">
            <label className={labelClass}>Flat surcharge rate ($/km)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                $
              </span>
              <input aria-label="Flat surcharge rate ($/km)"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.001"
                value={flatRate}
                onChange={(e) => setFlatRate(e.target.value)}
                placeholder="e.g. 0.08"
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
          {method === "formula" &&
            parseFloat(currentDiesel) > 0 &&
            parseFloat(currentDiesel) <= parseFloat(baselineDiesel) && (
              <p className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 mb-4">
                No surcharge — diesel is at or below the contract base price. Invoice equals the base freight rate.
              </p>
            )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                Surcharge per km
              </p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                ${result.surchargePerKm.toFixed(4)}
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                Total Fuel Surcharge
              </p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {fmt$(result.totalSurcharge)}
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                Total Invoice Amount
              </p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {fmt$(result.totalInvoice)}
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                Surcharge % of Base Rate
              </p>
              <p className="text-2xl font-bold text-orange-500">
                {result.surchargePct.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Breakdown card */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl p-5">
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
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 text-xs">
                    <span>
                      Diesel spread: ${parseFloat(currentDiesel).toFixed(3)} −{" "}
                      ${parseFloat(baselineDiesel).toFixed(3)} ={" "}
                      ${(parseFloat(currentDiesel) - parseFloat(baselineDiesel)).toFixed(3)}/L
                    </span>
                    <span>× {parseFloat(l100).toFixed(1)} L/100km ÷ 100</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 text-xs">
                    <span>
                      ${result.surchargePerKm.toFixed(4)}/km × {parseFloat(km).toLocaleString("en-AU")} km
                    </span>
                  </div>
                </>
              )}
              {method === "percent" && (
                <div className="flex justify-between text-gray-700 dark:text-gray-300 text-xs">
                  <span>
                    {fmt$(parseFloat(baseRate))} × {parseFloat(percentRate).toFixed(2)}%
                  </span>
                </div>
              )}
              {method === "flat_rate" && (
                <div className="flex justify-between text-gray-700 dark:text-gray-300 text-xs">
                  <span>
                    ${parseFloat(flatRate).toFixed(4)}/km × {parseFloat(km).toLocaleString("en-AU")} km
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Fuel surcharge</span>
                <span className="font-medium text-amber-700 dark:text-amber-300">
                  + {fmt$(result.totalSurcharge)}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
                <span>Total invoice</span>
                <span className="text-green-700 dark:text-green-300">{fmt$(result.totalInvoice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
