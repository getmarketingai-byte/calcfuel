"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_DIESEL_INPUT, DEFAULT_PETROL_INPUT } from "@/lib/fuel-prices";
import { trackCalculation } from "@/lib/analytics";
import {
  coeffsFromSpec,
  HONDA_SPECS,
  planGenerator,
  type GeneratorFuel,
  type GeneratorPlan,
} from "@/domain/models/generatorFuel";

const inputClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const USES = [
  { id: "camping", label: "Camping / caravan", load: "25", hours: "4", days: "7" },
  { id: "backup", label: "Home backup (outage)", load: "50", hours: "12", days: "3" },
  { id: "worksite", label: "Worksite tools", load: "75", hours: "8", days: "1" },
] as const;

export default function GeneratorFuelCalc() {
  const [model, setModel] = useState<string>("Honda EU22i");
  const [ratedW, setRatedW] = useState("1800");
  const [fuel, setFuel] = useState<GeneratorFuel>("petrol");
  const [load, setLoad] = useState("25");
  const [hoursPerDay, setHoursPerDay] = useState("4");
  const [days, setDays] = useState("7");
  const [fuelOnHand, setFuelOnHand] = useState("20");
  const [price, setPrice] = useState(DEFAULT_PETROL_INPUT);
  const [result, setResult] = useState<GeneratorPlan | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spec = useMemo(() => HONDA_SPECS.find((g) => g.model === model), [model]);

  const pickModel = (m: string) => {
    setModel(m);
    const g = HONDA_SPECS.find((x) => x.model === m);
    if (g) {
      setRatedW(String(Math.round(g.ratedKw * 1000)));
      setFuel("petrol");
      setPrice(DEFAULT_PETROL_INPUT);
    }
  };
  const pickFuel = (f: GeneratorFuel) => {
    setFuel(f);
    setPrice(f === "diesel" ? DEFAULT_DIESEL_INPUT : DEFAULT_PETROL_INPUT);
    if (f === "diesel") setModel("custom");
  };
  const pickUse = (id: string) => {
    const u = USES.find((x) => x.id === id);
    if (!u) return;
    setLoad(u.load);
    setHoursPerDay(u.hours);
    setDays(u.days);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const kw = parseFloat(ratedW) / 1000;
      const lf = parseFloat(load) / 100;
      if (!kw || kw <= 0) {
        setError("Enter the generator's rated (continuous) output in watts.");
        setResult(null);
        return;
      }
      if (!lf || lf <= 0 || lf > 1) {
        setError("Load must be between 1 and 100% of rated output.");
        setResult(null);
        return;
      }
      const plan = planGenerator({
        ratedKw: kw,
        loadFraction: lf,
        fuel,
        fuelOnHandL: parseFloat(fuelOnHand) || undefined,
        hoursPerDay: parseFloat(hoursPerDay) || 0,
        days: parseFloat(days) || 0,
        pricePerL: parseFloat(price) || undefined,
        coeffs: spec && Math.abs(spec.ratedKw - kw) < 1e-6 ? coeffsFromSpec(spec) : undefined,
      });
      setError("");
      setResult(plan);
      trackCalculation("generator_fuel", {
        fuel_type: fuel,
        watts: parseFloat(ratedW),
        load_pct: parseFloat(load),
        consumption_per_hour: parseFloat(plan.litresPerHour.toFixed(3)),
      });
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [ratedW, load, fuel, fuelOnHand, hoursPerDay, days, price, spec]);

  const outputW = (parseFloat(ratedW) || 0) * ((parseFloat(load) || 0) / 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Generator Fuel Calculator</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
        Litres per hour, run time on the fuel you carry, and fuel and cost for a camping trip or outage. Fuel prices start at
        the latest ACCC five-city average.
      </p>

      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Typical use">
        {USES.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => pickUse(u.id)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-orange-500"
          >
            {u.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass} htmlFor="gen-model">Generator</label>
          <select id="gen-model" value={model} onChange={(e) => pickModel(e.target.value)} className={inputClass}>
            {HONDA_SPECS.map((g) => (
              <option key={g.model} value={g.model}>
                {g.model} ({Math.round(g.ratedKw * 1000).toLocaleString("en-AU")} W rated, {g.tankL} L tank)
              </option>
            ))}
            <option value="custom">Other generator (enter size)</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="gen-fuel">Fuel</label>
          <select id="gen-fuel" value={fuel} onChange={(e) => pickFuel(e.target.value as GeneratorFuel)} className={inputClass}>
            <option value="petrol">Petrol (unleaded)</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="gen-rated">Rated output (watts)</label>
          <input
            id="gen-rated"
            type="number"
            inputMode="numeric"
            min="0"
            value={ratedW}
            onChange={(e) => {
              setRatedW(e.target.value);
              setModel("custom");
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="gen-load">Average load (% of rated)</label>
          <input id="gen-load" type="number" inputMode="numeric" min="1" max="100" value={load} onChange={(e) => setLoad(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="gen-hours">Hours run per day</label>
          <input id="gen-hours" type="number" inputMode="decimal" min="0" max="24" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="gen-days">Days</label>
          <input id="gen-days" type="number" inputMode="decimal" min="0" value={days} onChange={(e) => setDays(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="gen-onhand">Fuel on hand (litres)</label>
          <input id="gen-onhand" type="number" inputMode="decimal" min="0" value={fuelOnHand} onChange={(e) => setFuelOnHand(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="gen-price">Fuel price ($/L)</label>
          <input id="gen-price" type="number" inputMode="decimal" min="0" step="0.001" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result && (
        <div aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Fuel use at {Math.round(outputW).toLocaleString("en-AU")} W</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.litresPerHour.toFixed(2)} L/hr</p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{result.litresPerKwh.toFixed(2)} L per kWh delivered</p>
            </div>
            {result.runtimeHours !== null && (
              <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Run time on {fuelOnHand} L</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{result.runtimeHours.toFixed(1)} hours</p>
                {parseFloat(hoursPerDay) > 0 && (
                  <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                    About {(result.runtimeHours / parseFloat(hoursPerDay)).toFixed(1)} days at {hoursPerDay} h/day
                  </p>
                )}
              </div>
            )}
            {result.litresNeeded !== null && (
              <div className="p-4 rounded-xl border bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Fuel needed ({hoursPerDay} h × {days} days)</p>
                <p className="text-2xl font-bold text-orange-600">{result.litresNeeded.toFixed(1)} L</p>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{Math.ceil(result.litresNeeded / 20)} × 20 L jerry can{Math.ceil(result.litresNeeded / 20) === 1 ? "" : "s"}</p>
              </div>
            )}
            {result.cost !== null && (
              <div className="p-4 rounded-xl border bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Fuel cost</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  ${result.cost.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 mt-3">
            {spec && model !== "custom"
              ? `Fitted exactly to ${spec.model}'s published run times (${spec.hoursRated} h at rated load, ${spec.hoursQuarter} h at ¼ load on ${spec.tankL} L).`
              : fuel === "petrol"
                ? "Generic petrol model fitted to five Honda inverter generators; individual models can differ by up to about a quarter."
                : "Generic diesel model fitted to a published Australian diesel genset chart (about 0.3 L/kWh at full load)."}
          </p>
        </div>
      )}
    </div>
  );
}
