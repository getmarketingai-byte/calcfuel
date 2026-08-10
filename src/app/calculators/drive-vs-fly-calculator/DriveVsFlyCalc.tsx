"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalculatorShell,
  Disclaimer,
  InputGroup,
  Methodology,
  ResultCard,
  ResultGrid,
  ScenarioComparison,
  UnitToggle,
} from "@/components/calc";
import {
  calculateDriveVsFly,
  type DriveVsFlyResult,
} from "@/domain/models/driveVsFly";
import type { UnitSystem } from "@/domain/units";
import { trackCalculation } from "@/lib/analytics";

const DEFAULTS = {
  imperial: {
    distance: "600",
    fuelEconomy: "28",
    fuelPrice: "3.50",
    ticket: "180",
  },
  metric: {
    distance: "960",
    fuelEconomy: "8.5",
    fuelPrice: "1.85",
    ticket: "220",
  },
};

export default function DriveVsFlyCalc() {
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const d0 = DEFAULTS.imperial;

  const [distance, setDistance] = useState(d0.distance);
  const [fuelEconomy, setFuelEconomy] = useState(d0.fuelEconomy);
  const [fuelPrice, setFuelPrice] = useState(d0.fuelPrice);
  const [drivePassengers, setDrivePassengers] = useState("2");
  const [tolls, setTolls] = useState("20");
  const [destParking, setDestParking] = useState("40");
  const [timeValuePerHour, setTimeValuePerHour] = useState("25");
  const [hoursDriving, setHoursDriving] = useState("10");
  const [wearRate, setWearRate] = useState("10");

  const [flyPassengers, setFlyPassengers] = useState("2");
  const [ticketPricePerPerson, setTicketPricePerPerson] = useState(d0.ticket);
  const [airportParkingDays, setAirportParkingDays] = useState("3");
  const [airportParkingRate, setAirportParkingRate] = useState("30");
  const [rentalCarDays, setRentalCarDays] = useState("0");
  const [rentalCarRate, setRentalCarRate] = useState("55");

  const [result, setResult] = useState<DriveVsFlyResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: UnitSystem) => {
    if (next === unit) return;
    setUnit(next);
    const d = DEFAULTS[next];
    setDistance(d.distance);
    setFuelEconomy(d.fuelEconomy);
    setFuelPrice(d.fuelPrice);
    setTicketPricePerPerson(d.ticket);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const calc = calculateDriveVsFly({
        unit,
        distance: parseFloat(distance),
        efficiency: parseFloat(fuelEconomy),
        fuelPrice: parseFloat(fuelPrice),
        drivePassengers: parseInt(drivePassengers, 10) || 1,
        tolls: parseFloat(tolls) || 0,
        destinationParking: parseFloat(destParking) || 0,
        timeValuePerHour: parseFloat(timeValuePerHour) || 0,
        hoursDriving: parseFloat(hoursDriving) || 0,
        wearRateCents: parseFloat(wearRate) || 0,
        flyPassengers: parseInt(flyPassengers, 10) || 1,
        ticketPricePerPerson: parseFloat(ticketPricePerPerson),
        airportParkingDays: parseFloat(airportParkingDays) || 0,
        airportParkingRate: parseFloat(airportParkingRate) || 0,
        rentalCarDays: parseFloat(rentalCarDays) || 0,
        rentalCarRate: parseFloat(rentalCarRate) || 0,
      });
      setResult(calc);
      if (calc) {
        trackCalculation("drive_vs_fly", {
          unit,
          distance: parseFloat(distance),
          passengers: parseInt(drivePassengers, 10) || 1,
          drive_total: parseFloat(calc.drive.total.toFixed(2)),
          fly_total: parseFloat(calc.fly.total.toFixed(2)),
          cheaper: calc.cheaper,
        });
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    unit,
    distance,
    fuelEconomy,
    fuelPrice,
    drivePassengers,
    tolls,
    destParking,
    timeValuePerHour,
    hoursDriving,
    wearRate,
    flyPassengers,
    ticketPricePerPerson,
    airportParkingDays,
    airportParkingRate,
    rentalCarDays,
    rentalCarRate,
  ]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <CalculatorShell
      title="Drive vs Fly"
      description="Compare total trip cost — fuel, tolls, wear and time versus tickets, parking and rental."
      toolbar={
        <UnitToggle
          value={unit}
          onChange={switchUnit}
          metricLabel="km / Local $"
          imperialLabel="Miles / USD"
        />
      }
      results={
        result ? (
          <div className="space-y-4">
            <ResultGrid columns={2}>
              <ResultCard
                label="Drive total"
                value={fmt(result.drive.total)}
                hint={`${fmt(result.drive.perPerson)} / person`}
                tone={result.cheaper === "drive" ? "success" : "neutral"}
              />
              <ResultCard
                label="Fly total"
                value={fmt(result.fly.total)}
                hint={`${fmt(result.fly.perPerson)} / person`}
                tone={result.cheaper === "fly" ? "success" : "neutral"}
              />
            </ResultGrid>
            <ScenarioComparison
              title="Decision"
              cheaperId={result.cheaper === "tie" ? "tie" : result.cheaper}
              savingsLabel={
                result.cheaper === "tie" ? undefined : `Save ${fmt(result.savings)} overall`
              }
              scenarios={[
                {
                  id: "drive",
                  label: "Drive",
                  primary: fmt(result.drive.total),
                  secondary: `Fuel ${fmt(result.drive.fuel)} · tolls ${fmt(result.drive.tolls)} · wear ${fmt(result.drive.wear)} · time ${fmt(result.drive.timeValue)}`,
                },
                {
                  id: "fly",
                  label: "Fly",
                  primary: fmt(result.fly.total),
                  secondary: `Tickets ${fmt(result.fly.tickets)} · airport park ${fmt(result.fly.airportParking)} · rental ${fmt(result.fly.rentalCar)}`,
                },
              ]}
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter distance, economy, fuel price and ticket price to compare.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Drive total = fuel + tolls + destination parking + wear (cents × distance) + time value
              (hourly rate × hours). Fly total = tickets × passengers + airport parking + rental car.
              The cheaper option is within $1 treated as a tie.
            </p>
          </Methodology>
          <Disclaimer variant="planning" />
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Driving
          </h3>
          <InputGroup
            label={unit === "imperial" ? "Distance (miles one-way)" : "Distance (km one-way)"}
            type="number"
            min="0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Fuel economy (MPG)" : "Fuel use (L/100km)"}
            type="number"
            min="0"
            step="0.1"
            value={fuelEconomy}
            onChange={(e) => setFuelEconomy(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Fuel price / gallon" : "Fuel price / litre"}
            type="number"
            min="0"
            step="0.01"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
          />
          <InputGroup
            label="Passengers"
            type="number"
            min="1"
            max="8"
            value={drivePassengers}
            onChange={(e) => setDrivePassengers(e.target.value)}
          />
          <InputGroup
            label="Tolls (round trip total)"
            type="number"
            min="0"
            value={tolls}
            onChange={(e) => setTolls(e.target.value)}
          />
          <InputGroup
            label="Parking at destination (total)"
            type="number"
            min="0"
            value={destParking}
            onChange={(e) => setDestParking(e.target.value)}
          />
          <InputGroup
            label={
              unit === "imperial" ? "Wear rate (cents/mile)" : "Wear rate (cents/km)"
            }
            type="number"
            min="0"
            value={wearRate}
            onChange={(e) => setWearRate(e.target.value)}
          />
          <InputGroup
            label="Time value ($/hour)"
            type="number"
            min="0"
            value={timeValuePerHour}
            onChange={(e) => setTimeValuePerHour(e.target.value)}
          />
          <InputGroup
            label="Hours driving (round trip)"
            type="number"
            min="0"
            value={hoursDriving}
            onChange={(e) => setHoursDriving(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Flying
          </h3>
          <InputGroup
            label="Passengers"
            type="number"
            min="1"
            max="8"
            value={flyPassengers}
            onChange={(e) => setFlyPassengers(e.target.value)}
          />
          <InputGroup
            label="Round-trip ticket (per person)"
            type="number"
            min="0"
            value={ticketPricePerPerson}
            onChange={(e) => setTicketPricePerPerson(e.target.value)}
          />
          <InputGroup
            label="Airport parking days"
            type="number"
            min="0"
            value={airportParkingDays}
            onChange={(e) => setAirportParkingDays(e.target.value)}
          />
          <InputGroup
            label="Airport parking rate / day"
            type="number"
            min="0"
            value={airportParkingRate}
            onChange={(e) => setAirportParkingRate(e.target.value)}
          />
          <InputGroup
            label="Rental car days"
            type="number"
            min="0"
            value={rentalCarDays}
            onChange={(e) => setRentalCarDays(e.target.value)}
          />
          <InputGroup
            label="Rental car rate / day"
            type="number"
            min="0"
            value={rentalCarRate}
            onChange={(e) => setRentalCarRate(e.target.value)}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}
