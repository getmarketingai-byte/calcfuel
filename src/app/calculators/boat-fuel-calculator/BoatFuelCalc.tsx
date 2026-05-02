"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";
type HullType = "planing" | "displacement" | "semi_displacement" | "pontoon";

const HULL_BURN_FACTOR: Record<HullType, number> = {
  planing: 1.0,
  displacement: 0.6,
  semi_displacement: 0.75,
  pontoon: 0.85,
};

const HULL_LABELS: Record<HullType, string> = {
  planing: "Planing Hull (speedboat, bowrider)",
  displacement: "Displacement Hull (sailboat, trawler)",
  semi_displacement: "Semi-displacement Hull",
  pontoon: "Pontoon / Flat-bottom",
};

export default function BoatFuelCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [hullType, setHullType] = useState<HullType>("planing");
  const [engineHp, setEngineHp] = useState("150");
  const [numEngines, setNumEngines] = useState("1");
  const [throttle, setThrottle] = useState("75");
  const [speed, setSpeed] = useState("25");
  const [tripDistance, setTripDistance] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [fuelCapacity, setFuelCapacity] = useState("");

  const [result, setResult] = useState<{
    burnRatePerHour: number;
    burnRatePer100nm: number | null;
    tripFuel: number | null;
    tripCost: number | null;
    tripTime: number | null;
    range: number | null;
    mpg: number | null;
  } | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const hp = parseFloat(engineHp);
      const engines = parseFloat(numEngines) || 1;
      const throttlePct = parseFloat(throttle) / 100;
      const spd = parseFloat(speed);
      const distance = parseFloat(tripDistance);
      const price = parseFloat(fuelPrice);
      const capacity = parseFloat(fuelCapacity);

      if (!engineHp || isNaN(hp) || hp <= 0) {
        setResult(null);
        return;
      }

      // Rule of thumb: 1 HP ≈ 0.5 gallons/hour at full throttle for gas engines
      // Adjusted for throttle and hull type
      const totalHp = hp * engines;
      const rawBurnGphAtFull = totalHp * 0.05; // gallon/hr per 10hp is roughly 0.5 gal/hr per 10hp
      const adjustedBurn = rawBurnGphAtFull * Math.pow(throttlePct, 2.5) * HULL_BURN_FACTOR[hullType];

      // Convert to metric if needed
      const burnRatePerHour = unit === "metric"
        ? adjustedBurn * 3.78541  // gal to litres
        : adjustedBurn;

      // Cost and trip calculations
      const burnRatePer100nm = spd > 0 ? (burnRatePerHour / spd) * 100 : null;
      const tripTime = distance > 0 && spd > 0 ? distance / spd : null;
      const tripFuel = tripTime !== null ? burnRatePerHour * tripTime : null;
      const tripCost = tripFuel !== null && price > 0 ? tripFuel * price : null;

      // Range
      const range = capacity > 0 && burnRatePerHour > 0 && spd > 0
        ? (capacity / burnRatePerHour) * spd * 0.85  // 85% reserve rule
        : null;

      // Miles per gallon equiv
      const mpg = spd > 0 && adjustedBurn > 0
        ? spd / adjustedBurn
        : null;

      setResult({ burnRatePerHour, burnRatePer100nm, tripFuel, tripCost, tripTime, range, mpg });

      if (tripFuel !== null) {
        trackCalculation("boat_fuel", {
          unit,
          hullType,
          engineHp: hp,
          engines,
          throttlePct,
          speed: spd,
          tripDistance: distance,
          burnRatePerHour,
          tripFuel,
        });
      }
    }, 500);
  }, [unit, hullType, engineHp, numEngines, throttle, speed, tripDistance, fuelPrice, fuelCapacity]);

  const distLabel = unit === "imperial" ? "nautical miles" : "nautical miles";
  const fuelUnit = unit === "imperial" ? "gal" : "L";
  const speedLabel = unit === "imperial" ? "knots" : "knots";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-6 shadow-sm">
      {/* Unit Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit("imperial")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === "imperial" ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-orange-400"}`}
        >
          Imperial (gal, USD)
        </button>
        <button
          onClick={() => setUnit("metric")}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === "metric" ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-orange-400"}`}
        >
          Metric (L, AUD)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engine & Hull */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wide">Engine & Hull</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hull Type</label>
            <select
              value={hullType}
              onChange={e => setHullType(e.target.value as HullType)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {(Object.keys(HULL_LABELS) as HullType[]).map(h => (
                <option key={h} value={h}>{HULL_LABELS[h]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Engine Horsepower (HP) per engine</label>
            <input
              type="number"
              value={engineHp}
              onChange={e => setEngineHp(e.target.value)}
              placeholder="e.g. 150"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Engines</label>
            <select
              value={numEngines}
              onChange={e => setNumEngines(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="1">1 engine</option>
              <option value="2">2 engines</option>
              <option value="3">3 engines</option>
              <option value="4">4 engines</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Throttle / Load (%)</label>
            <input
              type="number"
              value={throttle}
              onChange={e => setThrottle(e.target.value)}
              min="10"
              max="100"
              placeholder="e.g. 75"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cruise = 60–75%, WOT = 100%</p>
          </div>
        </div>

        {/* Trip Planning */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wide">Trip Planning</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Speed ({speedLabel})</label>
            <input
              type="number"
              value={speed}
              onChange={e => setSpeed(e.target.value)}
              placeholder="e.g. 25"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trip Distance ({distLabel}) — optional</label>
            <input
              type="number"
              value={tripDistance}
              onChange={e => setTripDistance(e.target.value)}
              placeholder="e.g. 50"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Price (per {fuelUnit}) — optional</label>
            <input
              type="number"
              value={fuelPrice}
              onChange={e => setFuelPrice(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 4.50" : "e.g. 2.20"}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tank Capacity ({fuelUnit}) — optional (for range)</label>
            <input
              type="number"
              value={fuelCapacity}
              onChange={e => setFuelCapacity(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 80" : "e.g. 300"}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="mt-8 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {result.burnRatePerHour.toFixed(1)} {fuelUnit}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Fuel per hour</div>
            </div>

            {result.mpg !== null && (
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {result.mpg.toFixed(2)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {unit === "imperial" ? "NM per gallon" : "NM per litre"}
                </div>
              </div>
            )}

            {result.tripFuel !== null && (
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {result.tripFuel.toFixed(1)} {fuelUnit}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Fuel for trip</div>
              </div>
            )}

            {result.range !== null && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.round(result.range)} NM
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Safe range (85%)</div>
              </div>
            )}
          </div>

          {/* Trip summary */}
          {(result.tripFuel !== null || result.tripCost !== null || result.tripTime !== null) && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Trip Summary</h4>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {result.tripTime !== null && (
                  <div className="flex justify-between">
                    <span>Estimated trip time:</span>
                    <span className="font-medium">{result.tripTime.toFixed(1)} hours</span>
                  </div>
                )}
                {result.tripFuel !== null && (
                  <div className="flex justify-between">
                    <span>Fuel required:</span>
                    <span className="font-medium">{result.tripFuel.toFixed(1)} {fuelUnit}</span>
                  </div>
                )}
                {result.tripCost !== null && (
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                    <span className="font-semibold">Estimated fuel cost:</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">${result.tripCost.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <strong>Note:</strong> These estimates use the HP-based rule of thumb (approx. 0.05 gal/hr per HP at full throttle, adjusted for throttle level and hull type). Actual consumption varies by engine age, propeller pitch, load, sea conditions, and wind. Always carry at least a 30% fuel reserve and plan for the one-third rule (⅓ out, ⅓ back, ⅓ reserve).
          </p>
        </div>
      ) : (
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center text-gray-500 dark:text-gray-400">
          Enter your engine horsepower above to calculate fuel consumption.
        </div>
      )}
    </div>
  );
}
