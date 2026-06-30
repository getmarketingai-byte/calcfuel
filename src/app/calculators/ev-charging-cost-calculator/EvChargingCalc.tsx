"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "metric" | "imperial";
type ChargeType = "full" | "commute";

const AU_TARIFF_PRESETS = [
  { label: "Off-peak home charging (AU avg ~$0.14/kWh)", rate: 0.14 },
  { label: "Standard home tariff (AU avg ~$0.26/kWh)", rate: 0.26 },
  { label: "EV plan / dedicated EV tariff (~$0.10/kWh)", rate: 0.10 },
  { label: "Public Level 2 AC charger (~$0.40/kWh)", rate: 0.40 },
  { label: "DC fast charger / rapid charge (~$0.58/kWh)", rate: 0.58 },
  { label: "Enter my own rate", rate: 0 },
];

const EV_PRESETS = [
  { label: "Small city EV (e.g. BYD Dolphin, MG4 Standard)", kwhPer100: 14.5 },
  { label: "Mid-size sedan EV (e.g. Tesla Model 3, BYD Seal)", kwhPer100: 16.0 },
  { label: "Mid-size SUV EV (e.g. Tesla Model Y, Kia EV6)", kwhPer100: 18.5 },
  { label: "Large SUV / 4WD EV (e.g. Tesla Model X, Rivian)", kwhPer100: 24.0 },
  { label: "Performance EV (e.g. Tesla Model 3 Perf, Polestar 2)", kwhPer100: 19.5 },
  { label: "Enter my own consumption (kWh/100km)", kwhPer100: 0 },
];

export default function EvChargingCalc() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [chargeType, setChargeType] = useState<ChargeType>("full");

  // Full charge inputs
  const [batterySize, setBatterySize] = useState("75");
  const [startSoc, setStartSoc] = useState("20");
  const [endSoc, setEndSoc] = useState("80");

  // Commute inputs
  const [distance, setDistance] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("5");

  // Shared inputs
  const [evPresetIdx, setEvPresetIdx] = useState(1);
  const [customKwh, setCustomKwh] = useState("");
  const [tariffIdx, setTariffIdx] = useState(0);
  const [customRate, setCustomRate] = useState("");

  const [result, setResult] = useState<{
    kwhNeeded: number;
    chargeCost: number;
    weekly?: number;
    monthly?: number;
    annual?: number;
    costPerKm?: number;
    petrolEquivalent?: number;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const rate = tariffIdx === AU_TARIFF_PRESETS.length - 1
        ? parseFloat(customRate)
        : AU_TARIFF_PRESETS[tariffIdx].rate;
      const kwhPer100 = evPresetIdx === EV_PRESETS.length - 1
        ? parseFloat(customKwh)
        : EV_PRESETS[evPresetIdx].kwhPer100;

      if (!rate || rate <= 0) { setResult(null); setError("Please enter a valid electricity rate."); return; }
      if (!kwhPer100 || kwhPer100 <= 0) { setResult(null); setError("Please enter a valid EV consumption."); return; }

      if (chargeType === "full") {
        const battery = parseFloat(batterySize);
        const start = parseFloat(startSoc);
        const end = parseFloat(endSoc);
        if (!battery || battery <= 0 || isNaN(start) || isNaN(end) || end <= start) {
          setResult(null);
          setError(end <= start ? "End charge level must be higher than start." : "Please enter valid battery details.");
          return;
        }
        const socAdded = (end - start) / 100;
        const kwhNeeded = battery * socAdded;
        // Charging losses ~10%
        const kwhFromWall = kwhNeeded * 1.10;
        const chargeCost = kwhFromWall * rate;
        // Range from this charge (metric)
        const rangeKm = (kwhNeeded / kwhPer100) * 100;
        const petrolEquivalent = rangeKm * (10 / 100) * 1.92; // 10L/100km @ $1.92 reference
        setError("");
        setResult({ kwhNeeded: kwhFromWall, chargeCost, petrolEquivalent });
      } else {
        // commute mode
        const d = parseFloat(distance);
        const days = parseFloat(daysPerWeek);
        if (!d || d <= 0) { setResult(null); setError("Please enter a valid distance."); return; }
        if (!days || days <= 0 || days > 7) { setResult(null); setError("Days per week must be between 1 and 7."); return; }
        const distKm = unit === "metric" ? d : d * 1.60934;
        const roundTripKm = distKm * 2;
        // kWh needed from the battery per round trip
        const kwhUsed = (kwhPer100 / 100) * roundTripKm;
        // From wall with 10% charging loss
        const kwhFromWall = kwhUsed * 1.10;
        const dailyCost = kwhFromWall * rate;
        const weekly = dailyCost * days;
        const monthly = weekly * 4.33;
        const annual = weekly * 52;
        const costPerKm = dailyCost / roundTripKm;
        // Compare to petrol: 10 L/100km @ $1.92
        const petrolDailyCost = (10 / 100) * roundTripKm * 1.92;
        setError("");
        setResult({ kwhNeeded: kwhFromWall, chargeCost: dailyCost, weekly, monthly, annual, costPerKm, petrolEquivalent: petrolDailyCost });
      }

      trackCalculation("ev_charging_cost", {
        unit, charge_type: chargeType, tariff_rate: rate, kwh_per_100: kwhPer100,
      });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [unit, chargeType, batterySize, startSoc, endSoc, distance, daysPerWeek, evPresetIdx, customKwh, tariffIdx, customRate]);

  const fmt = (n: number) => "$" + n.toFixed(2);
  const fmtKwh = (n: number) => n.toFixed(1) + " kWh";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calculate EV Charging Cost</h2>
        {chargeType === "commute" && (
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
            <button onClick={() => setUnit("metric")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>km</button>
            <button onClick={() => setUnit("imperial")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>miles</button>
          </div>
        )}
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-5">
        <button onClick={() => setChargeType("full")} className={"flex-1 py-2 rounded-lg text-sm font-medium border transition-colors " + (chargeType === "full" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}>
          Full / Partial Charge
        </button>
        <button onClick={() => setChargeType("commute")} className={"flex-1 py-2 rounded-lg text-sm font-medium border transition-colors " + (chargeType === "commute" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}>
          Daily Commute
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {chargeType === "full" ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Battery Capacity (kWh)</label>
              <input type="number" inputMode="decimal" min="0" value={batterySize} onChange={e => setBatterySize(e.target.value)}
                placeholder="e.g. 75"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
              <p className="text-xs text-gray-400 mt-1">Find this in your EV&apos;s specs (usable capacity)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start charge (%)</label>
              <input type="number" inputMode="numeric" min="0" max="99" value={startSoc} onChange={e => setStartSoc(e.target.value)}
                placeholder="e.g. 20"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target charge (%)</label>
              <input type="number" inputMode="numeric" min="1" max="100" value={endSoc} onChange={e => setEndSoc(e.target.value)}
                placeholder="e.g. 80"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
              <p className="text-xs text-gray-400 mt-1">Most manufacturers recommend 80% for daily charging</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {unit === "metric" ? "One-Way Distance (km)" : "One-Way Distance (miles)"}
              </label>
              <input type="number" inputMode="decimal" min="0" value={distance} onChange={e => setDistance(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 25" : "e.g. 16"}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Days Per Week</label>
              <input type="number" inputMode="numeric" min="1" max="7" value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)}
                placeholder="e.g. 5"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">EV Model / Consumption</label>
          <select value={evPresetIdx.toString()} onChange={e => setEvPresetIdx(parseInt(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none">
            {EV_PRESETS.map((p, i) => (
              <option key={i} value={i.toString()}>{p.label}{p.kwhPer100 > 0 ? "" : ""}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Electricity Rate</label>
          <select value={tariffIdx.toString()} onChange={e => setTariffIdx(parseInt(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none">
            {AU_TARIFF_PRESETS.map((t, i) => (
              <option key={i} value={i.toString()}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Custom inputs */}
      {evPresetIdx === EV_PRESETS.length - 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">EV Consumption (kWh/100km)</label>
          <input type="number" inputMode="decimal" min="0" step="0.1" value={customKwh} onChange={e => setCustomKwh(e.target.value)}
            placeholder="e.g. 17.5"
            className="w-full sm:w-40 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-400 mt-1">Check your EV&apos;s WLTP or real-world energy consumption figure</p>
        </div>
      )}
      {tariffIdx === AU_TARIFF_PRESETS.length - 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Electricity Rate ($/kWh)</label>
          <input type="number" inputMode="decimal" min="0" step="0.01" value={customRate} onChange={e => setCustomRate(e.target.value)}
            placeholder="e.g. 0.22"
            className="w-full sm:w-40 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-400 mt-1">Check your electricity bill or energy provider for your tariff rate</p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result !== null && (
        <div className="mt-2 space-y-3" aria-live="polite">
          {chargeType === "full" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Energy drawn from wall</p>
                <p className="text-2xl font-bold text-blue-600">{fmtKwh(result.kwhNeeded)}</p>
                <p className="text-xs text-gray-400 mt-1">Includes ~10% charging losses</p>
              </div>
              <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Charging cost</p>
                <p className="text-2xl font-bold text-orange-500">{fmt(result.chargeCost)}</p>
              </div>
              {result.petrolEquivalent !== undefined && (
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Petrol equivalent cost*</p>
                  <p className="text-2xl font-bold text-green-600">{fmt(result.petrolEquivalent)}</p>
                  <p className="text-xs text-gray-400 mt-1">*10L/100km @ $1.92/L for same range</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Daily cost", value: fmt(result.chargeCost), cls: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800", tc: "text-blue-600" },
                  { label: "Weekly", value: fmt(result.weekly!), cls: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800", tc: "text-purple-600" },
                  { label: "Monthly", value: fmt(result.monthly!), cls: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800", tc: "text-orange-500" },
                  { label: "Annual", value: fmt(result.annual!), cls: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800", tc: "text-green-600" },
                ].map(item => (
                  <div key={item.label} className={"p-4 rounded-xl border " + item.cls}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                    <p className={"text-2xl font-bold " + item.tc}>{item.value}</p>
                  </div>
                ))}
              </div>
              {result.petrolEquivalent !== undefined && (
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300">
                  Petrol equivalent daily cost (10L/100km @ $1.92/L): <strong>{fmt(result.petrolEquivalent)}</strong>
                  &nbsp;·&nbsp; EV saves <strong className="text-green-600">{fmt(result.petrolEquivalent - result.chargeCost)}/day</strong>
                  {result.annual !== undefined && (
                    <> · <strong className="text-green-600">{fmt((result.petrolEquivalent - result.chargeCost) * parseFloat(daysPerWeek) * 52)}/year</strong></>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
