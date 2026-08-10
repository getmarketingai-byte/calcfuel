"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalculatorLifecycle,
  CalculatorShell,
  Disclaimer,
  InputGroup,
  Methodology,
  ResultCard,
  ResultGrid,
  UnitToggle,
} from "@/components/calc";
import {
  calculateVehicleRunningCost,
  type VehicleRunningCostResult,
} from "@/domain/models/vehicleRunningCost";
import type { UnitSystem } from "@/domain/units";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation } from "@/lib/analytics";

const DEFAULTS = {
  imperial: {
    annualMiles: "12000",
    gasPurchase: "28000",
    gasMpg: "30",
    gasPrice: "3.50",
    evPurchase: "42000",
    evEfficiency: "4",
    electricityRate: "0.13",
  },
  metric: {
    annualMiles: "15000",
    gasPurchase: "35000",
    gasMpg: "8",
    gasPrice: "1.85",
    evPurchase: "55000",
    evEfficiency: "18",
    electricityRate: "0.30",
  },
};

export default function EvVsGasCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [years, setYears] = useState<5 | 10>(5);
  const d0 = DEFAULTS.metric;

  const [gasPrice, setGasPrice] = useState(d0.gasPrice);
  const [gasMpg, setGasMpg] = useState(d0.gasMpg);
  const [gasPurchase, setGasPurchase] = useState(d0.gasPurchase);
  const [gasMaintenance, setGasMaintenance] = useState("1500");
  const [gasInsurance, setGasInsurance] = useState("1200");

  const [electricityRate, setElectricityRate] = useState(d0.electricityRate);
  const [evEfficiency, setEvEfficiency] = useState(d0.evEfficiency);
  const [evPurchase, setEvPurchase] = useState(d0.evPurchase);
  const [evMaintenance, setEvMaintenance] = useState("800");
  const [evInsurance, setEvInsurance] = useState("1400");

  const [annualMiles, setAnnualMiles] = useState(d0.annualMiles);
  const [result, setResult] = useState<VehicleRunningCostResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: UnitSystem) => {
    if (next === unit) return;
    setUnit(next);
    const d = DEFAULTS[next];
    setAnnualMiles(d.annualMiles);
    setGasPurchase(d.gasPurchase);
    setGasMpg(d.gasMpg);
    setGasPrice(d.gasPrice);
    setEvPurchase(d.evPurchase);
    setEvEfficiency(d.evEfficiency);
    setElectricityRate(d.electricityRate);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const calc = calculateVehicleRunningCost({
        unit,
        annualDistance: parseFloat(annualMiles),
        years,
        vehicleA: {
          id: "ev",
          label: "EV",
          kind: "electric",
          purchasePrice: parseFloat(evPurchase),
          efficiency: parseFloat(evEfficiency),
          energyPrice: parseFloat(electricityRate),
          annualMaintenance: parseFloat(evMaintenance) || 0,
          annualInsurance: parseFloat(evInsurance) || 0,
        },
        vehicleB: {
          id: "gas",
          label: "Petrol",
          kind: "fuel",
          purchasePrice: parseFloat(gasPurchase),
          efficiency: parseFloat(gasMpg),
          energyPrice: parseFloat(gasPrice),
          annualMaintenance: parseFloat(gasMaintenance) || 0,
          annualInsurance: parseFloat(gasInsurance) || 0,
        },
      });
      setResult(calc);
      if (calc) {
        trackCalculation("ev_vs_gas", {
          unit,
          years,
          annual_miles: parseFloat(annualMiles),
          gas_total: parseFloat(calc.vehicleB.totalCostOverHorizon.toFixed(0)),
          ev_total: parseFloat(calc.vehicleA.totalCostOverHorizon.toFixed(0)),
          savings: parseFloat(calc.horizonSavings.toFixed(0)),
        });
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    unit,
    years,
    annualMiles,
    gasPrice,
    gasMpg,
    gasPurchase,
    gasMaintenance,
    gasInsurance,
    electricityRate,
    evEfficiency,
    evPurchase,
    evMaintenance,
    evInsurance,
  ]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(n);

  const breakEvenYear =
    result == null
      ? null
      : result.neverBreaksEven
        ? null
        : result.breakEvenYears == null
          ? null
          : result.breakEvenYears <= 0
            ? 0
            : Math.ceil(result.breakEvenYears);

  return (
    <>
    <CalculatorLifecycle
      calculatorId="ev_vs_petrol"
      category="vehicles"
      hasResult={!!result}
      unitSystem={unit}
    />
    <CalculatorShell
      title="EV vs Petrol"
      description="Vehicle running-cost decision over 5 or 10 years — purchase, energy, maintenance and insurance. Calculation-based claims only."
      toolbar={
        <div className="flex gap-3">
          <UnitToggle
            value={unit}
            onChange={switchUnit}
            metricLabel="km"
            imperialLabel="Miles"
          />
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
            <button
              type="button"
              onClick={() => setYears(5)}
              className={
                "px-3 py-1.5 font-medium " +
                (years === 5 ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300")
              }
            >
              5 years
            </button>
            <button
              type="button"
              onClick={() => setYears(10)}
              className={
                "px-3 py-1.5 font-medium " +
                (years === 10 ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300")
              }
            >
              10 years
            </button>
          </div>
        </div>
      }
      results={
        result ? (
          <div className="space-y-4">
            <ResultGrid columns={2}>
              <ResultCard
                label={`Petrol (${years}-year total)`}
                value={fmt(result.vehicleB.totalCostOverHorizon)}
                hint={`Energy: ${fmt(result.vehicleB.annualEnergyCost * years)}`}
                tone="primary"
              />
              <ResultCard
                label={`EV (${years}-year total)`}
                value={fmt(result.vehicleA.totalCostOverHorizon)}
                hint={`Charging: ${fmt(result.vehicleA.annualEnergyCost * years)}`}
                tone="info"
              />
            </ResultGrid>
            <div
              className={
                "p-4 rounded-xl border " +
                (result.horizonSavings >= 0
                  ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800")
              }
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {result.horizonSavings >= 0
                  ? `EV saves over ${years} years`
                  : `Petrol saves over ${years} years`}
              </p>
              <p
                className={
                  "text-3xl font-bold " +
                  (result.horizonSavings >= 0 ? "text-green-600" : "text-red-500")
                }
              >
                {fmt(Math.abs(result.horizonSavings))}
              </p>
              {breakEvenYear != null ? (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Break-even:{" "}
                  {breakEvenYear === 0 ? "Immediate (EV costs less upfront)" : `Year ${breakEvenYear}`}
                </p>
              ) : result.horizonSavings < 0 ? (
                <p className="text-sm text-gray-500 mt-1">Petrol is cheaper over this period</p>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter purchase prices, economy, and energy rates to compare.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Uses `calculateVehicleRunningCost`: petrol energy via fuel primitives; EV energy via
              mi/kWh or kWh/100km × electricity rate. Totals = purchase + (energy + maintenance +
              insurance) × years. No subsidy or residual-value assumptions unless you encode them in
              the purchase price.
            </p>
          </Methodology>
          <Disclaimer variant="planning" />
        </div>
      }
    >
      <div className="mb-4">
        <InputGroup
          label={`Annual ${unit === "imperial" ? "miles" : "km"}`}
          type="number"
          min="0"
          value={annualMiles}
          onChange={(e) => setAnnualMiles(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Petrol vehicle
          </h3>
          <InputGroup
            label="Purchase price"
            type="number"
            min="0"
            value={gasPurchase}
            onChange={(e) => setGasPurchase(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Fuel economy (MPG)" : "Fuel use (L/100km)"}
            type="number"
            min="0"
            step="0.1"
            value={gasMpg}
            onChange={(e) => setGasMpg(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Fuel price / gallon" : "Fuel price / litre"}
            type="number"
            min="0"
            step="0.01"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
          />
          <InputGroup
            label="Annual maintenance"
            type="number"
            min="0"
            value={gasMaintenance}
            onChange={(e) => setGasMaintenance(e.target.value)}
          />
          <InputGroup
            label="Annual insurance"
            type="number"
            min="0"
            value={gasInsurance}
            onChange={(e) => setGasInsurance(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Electric vehicle
          </h3>
          <InputGroup
            label="Purchase price"
            type="number"
            min="0"
            value={evPurchase}
            onChange={(e) => setEvPurchase(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Efficiency (mi / kWh)" : "Efficiency (kWh/100km)"}
            type="number"
            min="0"
            step="0.1"
            value={evEfficiency}
            onChange={(e) => setEvEfficiency(e.target.value)}
          />
          <InputGroup
            label="Electricity rate / kWh"
            type="number"
            min="0"
            step="0.01"
            value={electricityRate}
            onChange={(e) => setElectricityRate(e.target.value)}
          />
          <InputGroup
            label="Annual maintenance"
            type="number"
            min="0"
            value={evMaintenance}
            onChange={(e) => setEvMaintenance(e.target.value)}
          />
          <InputGroup
            label="Annual insurance"
            type="number"
            min="0"
            value={evInsurance}
            onChange={(e) => setEvInsurance(e.target.value)}
          />
        </div>
      </div>
    </CalculatorShell>
    </>
  );
}
