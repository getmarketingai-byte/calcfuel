"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

interface DriveResult {
  fuel: number;
  tolls: number;
  parking: number;
  wear: number;
  timeValue: number;
  total: number;
  perPerson: number;
}

interface FlyResult {
  tickets: number;
  airportParking: number;
  rentalCar: number;
  total: number;
  perPerson: number;
}

interface CalcResult {
  drive: DriveResult;
  fly: FlyResult;
  cheaper: "drive" | "fly" | "tie";
  savings: number;
}

export default function DriveVsFlyCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");

  // Driving inputs
  const [distance, setDistance] = useState("");
  const [fuelEconomy, setFuelEconomy] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [drivePassengers, setDrivePassengers] = useState("2");
  const [tolls, setTolls] = useState("0");
  const [destParking, setDestParking] = useState("0");
  const [timeValuePerHour, setTimeValuePerHour] = useState("");
  const [hoursDriving, setHoursDriving] = useState("");
  const [wearRate, setWearRate] = useState("");

  // Flying inputs
  const [flyPassengers, setFlyPassengers] = useState("2");
  const [ticketPricePerPerson, setTicketPricePerPerson] = useState("");
  const [airportParkingDays, setAirportParkingDays] = useState("");
  const [airportParkingRate, setAirportParkingRate] = useState("30");
  const [rentalCarDays, setRentalCarDays] = useState("");
  const [rentalCarRate, setRentalCarRate] = useState("");

  const [result, setResult] = useState<CalcResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const dist = parseFloat(distance);
      const economy = parseFloat(fuelEconomy);
      const price = parseFloat(fuelPrice);
      const dPass = parseInt(drivePassengers) || 1;
      const tollAmt = parseFloat(tolls) || 0;
      const parkDest = parseFloat(destParking) || 0;
      const tVal = parseFloat(timeValuePerHour) || 0;
      const hDrive = parseFloat(hoursDriving) || 0;
      const wear = parseFloat(wearRate) || 0;

      const fPass = parseInt(flyPassengers) || 1;
      const ticketPP = parseFloat(ticketPricePerPerson);
      const apDays = parseFloat(airportParkingDays) || 0;
      const apRate = parseFloat(airportParkingRate) || 0;
      const rcDays = parseFloat(rentalCarDays) || 0;
      const rcRate = parseFloat(rentalCarRate) || 0;

      // Need at minimum: distance, economy, price for driving; tickets for flying
      if (!dist || !economy || !price || !ticketPP) {
        setResult(null);
        return;
      }

      // --- Driving cost ---
      let fuelCost: number;
      if (unit === "imperial") {
        // miles / MPG * price per gallon
        fuelCost = (dist / economy) * price;
      } else {
        // (L/100km) * km / 100 * price per litre
        fuelCost = (economy / 100) * dist * price;
      }

      // Wear: cents/mile or currency/km → convert to dollars
      const wearCost = unit === "imperial"
        ? dist * (wear / 100)
        : dist * (wear / 100);

      const timeValueCost = tVal * hDrive;

      const driveTotal = fuelCost + tollAmt + parkDest + wearCost + timeValueCost;
      const drivePerPerson = driveTotal / dPass;

      // --- Flying cost ---
      const tickets = fPass * ticketPP;
      const airportParking = apDays * apRate;
      const rentalCar = rcDays * rcRate;
      const flyTotal = tickets + airportParking + rentalCar;
      const flyPerPerson = flyTotal / fPass;

      const diff = driveTotal - flyTotal;
      let cheaper: "drive" | "fly" | "tie";
      if (Math.abs(diff) < 1) {
        cheaper = "tie";
      } else if (diff < 0) {
        cheaper = "drive";
      } else {
        cheaper = "fly";
      }

      const calcResult: CalcResult = {
        drive: {
          fuel: fuelCost,
          tolls: tollAmt,
          parking: parkDest,
          wear: wearCost,
          timeValue: timeValueCost,
          total: driveTotal,
          perPerson: drivePerPerson,
        },
        fly: {
          tickets,
          airportParking,
          rentalCar,
          total: flyTotal,
          perPerson: flyPerPerson,
        },
        cheaper,
        savings: Math.abs(diff),
      };

      setResult(calcResult);
      trackCalculation("drive_vs_fly", {
        unit,
        distance: dist,
        passengers: dPass,
        drive_total: parseFloat(driveTotal.toFixed(2)),
        fly_total: parseFloat(flyTotal.toFixed(2)),
        cheaper,
      });
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    unit, distance, fuelEconomy, fuelPrice, drivePassengers, tolls, destParking,
    timeValuePerHour, hoursDriving, wearRate,
    flyPassengers, ticketPricePerPerson, airportParkingDays, airportParkingRate,
    rentalCarDays, rentalCarRate,
  ]);

  const currencySymbol = unit === "imperial" ? "$" : "$";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const inputCls =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";
  const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const distLabel = unit === "imperial" ? "Trip Distance (miles one-way)" : "Trip Distance (km one-way)";
  const economyLabel = unit === "imperial" ? "Fuel Economy (MPG)" : "Fuel Economy (L/100km)";
  const fuelPriceLabel = unit === "imperial" ? "Fuel Price (per gallon)" : "Fuel Price (per litre)";
  const wearLabel = unit === "imperial" ? "Vehicle Wear Rate (cents/mile, optional)" : "Vehicle Wear Rate (cents/km, optional)";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + unit toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Drive vs Fly Cost Comparison</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button
            onClick={() => setUnit("imperial")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Miles / USD
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            km / Local
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Driving section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            🚗 Driving
          </h3>
          <div>
            <label className={labelCls}>{distLabel}</label>
            <input
              type="number" inputMode="decimal" min="0" value={distance}
              onChange={e => setDistance(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 300" : "e.g. 480"}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>{economyLabel}</label>
            <input
              type="number" inputMode="decimal" min="0" step="0.1" value={fuelEconomy}
              onChange={e => setFuelEconomy(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 28" : "e.g. 8.5"}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>{fuelPriceLabel}</label>
            <input
              type="number" inputMode="decimal" min="0" step="0.01" value={fuelPrice}
              onChange={e => setFuelPrice(e.target.value)}
              placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Number of Passengers (1–4)</label>
            <input
              type="number" inputMode="numeric" min="1" max="8" value={drivePassengers}
              onChange={e => setDrivePassengers(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Tolls — Round Trip Total ({currencySymbol})</label>
            <input
              type="number" inputMode="decimal" min="0" step="0.5" value={tolls}
              onChange={e => setTolls(e.target.value)}
              placeholder="e.g. 20"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Parking at Destination — Total ({currencySymbol})</label>
            <input
              type="number" inputMode="decimal" min="0" value={destParking}
              onChange={e => setDestParking(e.target.value)}
              placeholder="e.g. 60"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>{wearLabel}</label>
            <input
              type="number" inputMode="decimal" min="0" step="0.5" value={wearRate}
              onChange={e => setWearRate(e.target.value)}
              placeholder="e.g. 10"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Your Time Value (per hour, optional)</label>
            <input
              type="number" inputMode="decimal" min="0" value={timeValuePerHour}
              onChange={e => setTimeValuePerHour(e.target.value)}
              placeholder="e.g. 25"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Total Hours Driving — Round Trip (optional)</label>
            <input
              type="number" inputMode="decimal" min="0" value={hoursDriving}
              onChange={e => setHoursDriving(e.target.value)}
              placeholder="e.g. 10"
              className={inputCls}
            />
          </div>
        </div>

        {/* Flying section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            ✈️ Flying
          </h3>
          <div>
            <label className={labelCls}>Number of Passengers</label>
            <input
              type="number" inputMode="numeric" min="1" max="8" value={flyPassengers}
              onChange={e => setFlyPassengers(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Round-Trip Ticket Price (per person, {currencySymbol})</label>
            <input
              type="number" inputMode="decimal" min="0" value={ticketPricePerPerson}
              onChange={e => setTicketPricePerPerson(e.target.value)}
              placeholder="e.g. 180"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Airport Parking — Days</label>
            <input
              type="number" inputMode="numeric" min="0" value={airportParkingDays}
              onChange={e => setAirportParkingDays(e.target.value)}
              placeholder="e.g. 5"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Airport Parking — Daily Rate ({currencySymbol})</label>
            <input
              type="number" inputMode="decimal" min="0" value={airportParkingRate}
              onChange={e => setAirportParkingRate(e.target.value)}
              placeholder="e.g. 30"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Rental Car at Destination — Days (optional)</label>
            <input
              type="number" inputMode="numeric" min="0" value={rentalCarDays}
              onChange={e => setRentalCarDays(e.target.value)}
              placeholder="e.g. 4"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Rental Car — Daily Rate ({currencySymbol}, optional)</label>
            <input
              type="number" inputMode="decimal" min="0" value={rentalCarRate}
              onChange={e => setRentalCarRate(e.target.value)}
              placeholder="e.g. 65"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Placeholder prompt */}
      {result === null && (
        <div className="mt-8 text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl text-gray-400 dark:text-gray-500">
          <p className="text-sm">Enter trip distance, fuel economy, fuel price, and ticket price to see your comparison.</p>
        </div>
      )}

      {/* Results */}
      {result !== null && (
        <div className="mt-8 space-y-4" aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Drive card */}
            <div className={`p-5 rounded-xl border ${result.cheaper === "drive" ? "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700 ring-2 ring-green-400" : "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800"}`}>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                🚗 Driving Total
                {result.cheaper === "drive" && <span className="ml-2 text-green-600 dark:text-green-400">— Cheaper</span>}
              </p>
              <p className="text-3xl font-bold text-orange-500">{fmt(result.drive.total)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{fmt(result.drive.perPerson)} per person</p>
              <div className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between"><span>Fuel</span><span>{fmt(result.drive.fuel)}</span></div>
                {result.drive.tolls > 0 && <div className="flex justify-between"><span>Tolls</span><span>{fmt(result.drive.tolls)}</span></div>}
                {result.drive.parking > 0 && <div className="flex justify-between"><span>Dest. Parking</span><span>{fmt(result.drive.parking)}</span></div>}
                {result.drive.wear > 0 && <div className="flex justify-between"><span>Vehicle Wear</span><span>{fmt(result.drive.wear)}</span></div>}
                {result.drive.timeValue > 0 && <div className="flex justify-between"><span>Time Value</span><span>{fmt(result.drive.timeValue)}</span></div>}
              </div>
            </div>

            {/* Fly card */}
            <div className={`p-5 rounded-xl border ${result.cheaper === "fly" ? "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700 ring-2 ring-green-400" : "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"}`}>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                ✈️ Flying Total
                {result.cheaper === "fly" && <span className="ml-2 text-green-600 dark:text-green-400">— Cheaper</span>}
              </p>
              <p className="text-3xl font-bold text-blue-600">{fmt(result.fly.total)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{fmt(result.fly.perPerson)} per person</p>
              <div className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between"><span>Tickets</span><span>{fmt(result.fly.tickets)}</span></div>
                {result.fly.airportParking > 0 && <div className="flex justify-between"><span>Airport Parking</span><span>{fmt(result.fly.airportParking)}</span></div>}
                {result.fly.rentalCar > 0 && <div className="flex justify-between"><span>Rental Car</span><span>{fmt(result.fly.rentalCar)}</span></div>}
              </div>
            </div>
          </div>

          {/* Summary banner */}
          <div className={`p-4 rounded-xl border ${result.cheaper === "tie" ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"}`}>
            {result.cheaper === "tie" ? (
              <p className="font-semibold text-yellow-700 dark:text-yellow-300">Both options cost roughly the same for this trip.</p>
            ) : (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {result.cheaper === "drive" ? "Driving saves you" : "Flying saves you"}
                </p>
                <p className="text-3xl font-bold text-green-600">{fmt(result.savings)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {result.cheaper === "drive"
                    ? `Driving is ${fmt(result.drive.perPerson)} vs ${fmt(result.fly.perPerson)} per person by air.`
                    : `Flying is ${fmt(result.fly.perPerson)} vs ${fmt(result.drive.perPerson)} per person by road.`}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
