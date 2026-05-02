"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

interface Trip {
  id: number;
  name: string;
  distancePerTrip: string;
  tripsPerWeek: string;
}

interface TripResult {
  id: number;
  name: string;
  weeklyDistance: number;
  weeklyFuel: number;
  percentOfTotal: number;
}

interface RationingResult {
  totalRangeAvailable: number;
  totalWeeklyFuel: number;
  daysOfSupply: number;
  dailyBudget: number;
  tripResults: TripResult[];
  alertLevel: "critical" | "warning" | "caution" | "ok";
}

let nextId = 4;

export default function EmergencyFuelRationingCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");

  // Fuel supply inputs
  const [tankFuel, setTankFuel] = useState("10");
  const [storedFuel, setStoredFuel] = useState("5");
  const [fuelEconomy, setFuelEconomy] = useState("30");

  // Trips
  const [trips, setTrips] = useState<Trip[]>([
    { id: 1, name: "Work commute", distancePerTrip: "15", tripsPerWeek: "10" },
    { id: 2, name: "Grocery shopping", distancePerTrip: "5", tripsPerWeek: "2" },
    { id: 3, name: "Doctor / medical", distancePerTrip: "8", tripsPerWeek: "1" },
  ]);

  const [result, setResult] = useState<RationingResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const tank = parseFloat(tankFuel) || 0;
      const stored = parseFloat(storedFuel) || 0;
      const economy = parseFloat(fuelEconomy);

      if (!economy || economy <= 0) { setResult(null); return; }

      const totalFuel = tank + stored;

      // Calculate total range: imperial = miles = totalGal * MPG; metric = km = totalLitres * (100/L100km)
      const totalRange = unit === "imperial"
        ? totalFuel * economy
        : totalFuel * (100 / economy);

      // Calculate trip results
      const validTrips = trips.filter(
        (t) => t.name.trim() && parseFloat(t.distancePerTrip) > 0 && parseFloat(t.tripsPerWeek) > 0
      );

      const tripResults: TripResult[] = validTrips.map((t) => {
        const dist = parseFloat(t.distancePerTrip);
        const tpw = parseFloat(t.tripsPerWeek);
        const weeklyDist = dist * tpw;
        let weeklyFuel: number;
        if (unit === "imperial") {
          weeklyFuel = weeklyDist / economy;
        } else {
          weeklyFuel = (economy / 100) * weeklyDist;
        }
        return {
          id: t.id,
          name: t.name,
          weeklyDistance: weeklyDist,
          weeklyFuel,
          percentOfTotal: 0,
        };
      });

      const totalWeeklyFuel = tripResults.reduce((sum, t) => sum + t.weeklyFuel, 0);

      // Assign percentages
      tripResults.forEach((t) => {
        t.percentOfTotal = totalWeeklyFuel > 0 ? (t.weeklyFuel / totalWeeklyFuel) * 100 : 0;
      });

      // Days of supply
      const daysOfSupply = totalWeeklyFuel > 0 ? (totalFuel / totalWeeklyFuel) * 7 : Infinity;
      const dailyBudget = totalWeeklyFuel / 7;

      let alertLevel: RationingResult["alertLevel"] = "ok";
      if (daysOfSupply < 7) alertLevel = "critical";
      else if (daysOfSupply < 14) alertLevel = "warning";
      else if (daysOfSupply < 30) alertLevel = "caution";

      setResult({ totalRangeAvailable: totalRange, totalWeeklyFuel, daysOfSupply, dailyBudget, tripResults, alertLevel });

      trackCalculation("emergency_fuel_rationing", {
        unit,
        total_fuel: totalFuel,
        days_of_supply: parseFloat(daysOfSupply.toFixed(1)),
        weekly_fuel: parseFloat(totalWeeklyFuel.toFixed(2)),
        trip_count: validTrips.length,
        alert_level: alertLevel,
      });
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [unit, tankFuel, storedFuel, fuelEconomy, trips]);

  function handleUnitChange(newUnit: Unit) {
    setUnit(newUnit);
    if (newUnit === "imperial") {
      setFuelEconomy("30");
      setTankFuel("10");
      setStoredFuel("5");
      setTrips([
        { id: 1, name: "Work commute", distancePerTrip: "15", tripsPerWeek: "10" },
        { id: 2, name: "Grocery shopping", distancePerTrip: "5", tripsPerWeek: "2" },
        { id: 3, name: "Doctor / medical", distancePerTrip: "8", tripsPerWeek: "1" },
      ]);
    } else {
      setFuelEconomy("7.8");
      setTankFuel("38");
      setStoredFuel("20");
      setTrips([
        { id: 1, name: "Work commute", distancePerTrip: "24", tripsPerWeek: "10" },
        { id: 2, name: "Grocery shopping", distancePerTrip: "8", tripsPerWeek: "2" },
        { id: 3, name: "Doctor / medical", distancePerTrip: "13", tripsPerWeek: "1" },
      ]);
    }
  }

  function addTrip() {
    if (trips.length >= 5) return;
    setTrips((prev) => [...prev, { id: nextId++, name: "", distancePerTrip: "", tripsPerWeek: "1" }]);
  }

  function removeTrip(id: number) {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTrip(id: number, field: keyof Omit<Trip, "id">, value: string) {
    setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }

  const volLabel = unit === "imperial" ? "gallons" : "litres";
  const distLabel = unit === "imperial" ? "miles" : "km";
  const econLabel = unit === "imperial" ? "MPG" : "L/100km";

  const inputCls =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none text-sm";

  const fmt = (n: number, decimals = 1) =>
    isFinite(n) ? n.toFixed(decimals) : "∞";

  const alertConfig = {
    critical: {
      bg: "bg-red-50 dark:bg-red-950",
      border: "border-red-300 dark:border-red-700",
      text: "text-red-700 dark:text-red-300",
      icon: "🚨",
      label: "CRITICAL — Less than 7 days of fuel supply",
    },
    warning: {
      bg: "bg-orange-50 dark:bg-orange-950",
      border: "border-orange-300 dark:border-orange-700",
      text: "text-orange-700 dark:text-orange-300",
      icon: "⚠️",
      label: "WARNING — Less than 14 days of fuel supply",
    },
    caution: {
      bg: "bg-yellow-50 dark:bg-yellow-950",
      border: "border-yellow-300 dark:border-yellow-700",
      text: "text-yellow-700 dark:text-yellow-300",
      icon: "⚡",
      label: "CAUTION — Less than 30 days of fuel supply",
    },
    ok: {
      bg: "bg-green-50 dark:bg-green-950",
      border: "border-green-300 dark:border-green-700",
      text: "text-green-700 dark:text-green-300",
      icon: "✅",
      label: "ADEQUATE — 30+ days of supply at current consumption",
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + unit toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Emergency Fuel Rationing Planner</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button
            onClick={() => handleUnitChange("imperial")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Miles / Gallons
          </button>
          <button
            onClick={() => handleUnitChange("metric")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            km / Litres
          </button>
        </div>
      </div>

      {/* Fuel Supply Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2 mb-4">
          🛢️ Fuel Supply
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fuel in Tank ({volLabel})
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={tankFuel}
              onChange={(e) => setTankFuel(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 10" : "e.g. 38"}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Stored Fuel ({volLabel})
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={storedFuel}
              onChange={(e) => setStoredFuel(e.target.value)}
              placeholder="e.g. 5"
              className={inputCls}
            />
            <p className="text-xs text-gray-400 mt-1">Jerry cans, extra containers</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fuel Economy ({econLabel})
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={fuelEconomy}
              onChange={(e) => setFuelEconomy(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 30" : "e.g. 7.8"}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Trip Priorities Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2 flex-1">
            🗺️ Essential Trips (weekly)
          </h3>
        </div>
        <div className="space-y-3">
          {trips.map((trip, i) => (
            <div key={trip.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-12 sm:col-span-4">
                {i === 0 && <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Trip Name</label>}
                <input
                  type="text"
                  value={trip.name}
                  onChange={(e) => updateTrip(trip.id, "name", e.target.value)}
                  placeholder="e.g. Work commute"
                  className={inputCls}
                />
              </div>
              <div className="col-span-5 sm:col-span-3">
                {i === 0 && <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Distance ({distLabel})</label>}
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  value={trip.distancePerTrip}
                  onChange={(e) => updateTrip(trip.id, "distancePerTrip", e.target.value)}
                  placeholder="e.g. 15"
                  className={inputCls}
                />
              </div>
              <div className="col-span-5 sm:col-span-3">
                {i === 0 && <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Trips/week</label>}
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={trip.tripsPerWeek}
                  onChange={(e) => updateTrip(trip.id, "tripsPerWeek", e.target.value)}
                  placeholder="e.g. 5"
                  className={inputCls}
                />
              </div>
              <div className="col-span-2 sm:col-span-2 flex justify-end">
                {i === 0 && <div className="text-xs text-gray-400 mb-1 invisible">X</div>}
                <button
                  onClick={() => removeTrip(trip.id)}
                  className="text-red-400 hover:text-red-600 transition-colors px-2 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-lg leading-none"
                  aria-label="Remove trip"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        {trips.length < 5 && (
          <button
            onClick={addTrip}
            className="mt-3 text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add trip {trips.length > 0 && `(${5 - trips.length} remaining)`}
          </button>
        )}
        {trips.length >= 5 && (
          <p className="mt-2 text-xs text-gray-400">Maximum of 5 trips reached.</p>
        )}
      </div>

      {/* Placeholder */}
      {result === null && (
        <div className="mt-4 text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-500 dark:text-gray-400">Enter your fuel supply and trip details above to calculate your rationing plan.</p>
        </div>
      )}

      {/* Results */}
      {result !== null && (
        <div className="mt-6 space-y-4" aria-live="polite">
          {/* Alert banner */}
          <div className={`p-4 rounded-xl border ${alertConfig[result.alertLevel].bg} ${alertConfig[result.alertLevel].border}`}>
            <p className={`font-semibold ${alertConfig[result.alertLevel].text}`}>
              {alertConfig[result.alertLevel].icon} {alertConfig[result.alertLevel].label}
            </p>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Range</p>
              <p className="text-xl font-bold text-orange-500">{fmt(result.totalRangeAvailable, 0)}</p>
              <p className="text-xs text-gray-500">{distLabel}</p>
            </div>
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Days of Supply</p>
              <p className="text-xl font-bold text-blue-600">{isFinite(result.daysOfSupply) ? fmt(result.daysOfSupply, 1) : "∞"}</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
            <div className="p-4 rounded-xl border bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Weekly Consumption</p>
              <p className="text-xl font-bold text-purple-600">{fmt(result.totalWeeklyFuel, 2)}</p>
              <p className="text-xs text-gray-500">{volLabel}/week</p>
            </div>
            <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Daily Budget</p>
              <p className="text-xl font-bold text-green-600">{fmt(result.dailyBudget, 2)}</p>
              <p className="text-xs text-gray-500">{volLabel}/day</p>
            </div>
          </div>

          {/* Day thresholds */}
          <div className="flex flex-wrap gap-2">
            {[7, 14, 30].map((days) => {
              const ok = result.daysOfSupply >= days;
              return (
                <div
                  key={days}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${ok ? "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"}`}
                >
                  {ok ? "✓" : "✗"} {days}-day supply
                </div>
              );
            })}
          </div>

          {/* Trip breakdown table */}
          {result.tripResults.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Trip</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Weekly {distLabel}</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Weekly {volLabel}</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">% of Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {result.tripResults
                    .slice()
                    .sort((a, b) => b.weeklyFuel - a.weeklyFuel)
                    .map((t) => (
                      <tr key={t.id}>
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{t.name}</td>
                        <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">{fmt(t.weeklyDistance, 1)}</td>
                        <td className="px-4 py-3 text-right font-mono text-gray-800 dark:text-gray-200">{fmt(t.weeklyFuel, 2)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                              <div
                                className="bg-orange-500 h-1.5 rounded-full"
                                style={{ width: `${Math.min(t.percentOfTotal, 100)}%` }}
                              />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 text-xs w-10 text-right">{fmt(t.percentOfTotal, 1)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Total</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">
                      {fmt(result.tripResults.reduce((s, t) => s + t.weeklyDistance, 0), 1)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">
                      {fmt(result.totalWeeklyFuel, 2)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {result.tripResults.length === 0 && (
            <div className="text-center py-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">Add trip details above to see per-trip fuel breakdown.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
