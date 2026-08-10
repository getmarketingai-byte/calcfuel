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
  calculateVehicleComparison,
  type VehicleComparisonResult,
} from "@/domain/models/vehicleComparison";
import type { UnitSystem } from "@/domain/units";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation } from "@/lib/analytics";

const METRIC_DEFAULTS = {
  annualDistance: "15000",
  hybridPrice: "45000",
  gasPrice: "35000",
  hybridEfficiency: "4.5",
  gasEfficiency: "8.5",
  fuelPrice: "1.80",
};

const IMPERIAL_DEFAULTS = {
  annualDistance: "12000",
  hybridPrice: "45000",
  gasPrice: "35000",
  hybridEfficiency: "50",
  gasEfficiency: "28",
  fuelPrice: "3.50",
};

export default function HybridVsGasCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [hybridPrice, setHybridPrice] = useState(METRIC_DEFAULTS.hybridPrice);
  const [gasPrice, setGasPrice] = useState(METRIC_DEFAULTS.gasPrice);
  const [annualDistance, setAnnualDistance] = useState(METRIC_DEFAULTS.annualDistance);
  const [hybridEfficiency, setHybridEfficiency] = useState(METRIC_DEFAULTS.hybridEfficiency);
  const [gasEfficiency, setGasEfficiency] = useState(METRIC_DEFAULTS.gasEfficiency);
  const [fuelPrice, setFuelPrice] = useState(METRIC_DEFAULTS.fuelPrice);
  const [maintenanceSavings, setMaintenanceSavings] = useState("300");
  const [result, setResult] = useState<VehicleComparisonResult | null>(null);
  const [incompleteHint, setIncompleteHint] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: UnitSystem) => {
    if (next === unit) return;
    setUnit(next);
    const d = next === "metric" ? METRIC_DEFAULTS : IMPERIAL_DEFAULTS;
    setAnnualDistance(d.annualDistance);
    setHybridEfficiency(d.hybridEfficiency);
    setGasEfficiency(d.gasEfficiency);
    setFuelPrice(d.fuelPrice);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const hp = parseFloat(hybridPrice);
      const gp = parseFloat(gasPrice);
      const dist = parseFloat(annualDistance);
      const heff = parseFloat(hybridEfficiency);
      const geff = parseFloat(gasEfficiency);
      const fp = parseFloat(fuelPrice);
      const maint = parseFloat(maintenanceSavings) || 0;

      const missing: string[] = [];
      if (!hybridPrice || isNaN(hp) || hp <= 0) missing.push("hybrid purchase price");
      if (!gasPrice || isNaN(gp) || gp <= 0) missing.push("gas purchase price");
      if (!annualDistance || isNaN(dist) || dist <= 0) missing.push("annual distance");
      if (!hybridEfficiency || isNaN(heff) || heff <= 0) missing.push("hybrid fuel economy");
      if (!gasEfficiency || isNaN(geff) || geff <= 0) missing.push("gas fuel economy");
      if (!fuelPrice || isNaN(fp) || fp <= 0) missing.push("fuel price");

      if (missing.length > 0) {
        setResult(null);
        setIncompleteHint(
          `Enter ${missing.slice(0, 3).join(", ")}${missing.length > 3 ? ", and more" : ""} to see break-even.`
        );
        return;
      }

      setIncompleteHint("");
      const calc = calculateVehicleComparison({
        unit,
        annualDistance: dist,
        fuelPrice: fp,
        vehicleA: {
          id: "hybrid",
          label: "Hybrid",
          purchasePrice: hp,
          efficiency: heff,
          annualOtherSavings: maint,
        },
        vehicleB: {
          id: "gas",
          label: "Petrol",
          purchasePrice: gp,
          efficiency: geff,
        },
      });

      let final = calc;
      if (calc && calc.breakEvenYears != null && calc.breakEvenYears > 30) {
        final = { ...calc, neverBreaksEven: true, breakEvenYears: null, breakEvenMonths: null };
      }

      setResult(final);
      if (final) {
        trackCalculation("hybrid_vs_gas", {
          unit,
          annual_distance: dist,
          hybrid_price: hp,
          gas_price: gp,
          price_premium: final.purchasePremium,
          annual_fuel_savings: parseFloat(final.annualFuelSavings.toFixed(0)),
          annual_total_savings: parseFloat(final.annualTotalSavings.toFixed(0)),
          break_even_months: final.breakEvenMonths != null ? Math.ceil(final.breakEvenMonths) : -1,
          savings_5yr: parseFloat(final.savings5yr.toFixed(0)),
          savings_10yr: parseFloat(final.savings10yr.toFixed(0)),
          never_breaks_even: final.neverBreaksEven ? 1 : 0,
        });
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    unit,
    hybridPrice,
    gasPrice,
    annualDistance,
    hybridEfficiency,
    gasEfficiency,
    fuelPrice,
    maintenanceSavings,
  ]);

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(Math.abs(n));

  const breakEvenDisplay = (() => {
    if (!result || result.neverBreaksEven) return null;
    if (result.breakEvenMonths === 0) return "Immediate — hybrid is already cheaper upfront";
    if (result.breakEvenMonths != null && result.breakEvenYears != null) {
      const months = Math.ceil(result.breakEvenMonths);
      const yrs = Math.floor(months / 12);
      const mos = months % 12;
      if (yrs === 0) return `${months} months`;
      if (mos === 0) return `${yrs} ${yrs === 1 ? "year" : "years"}`;
      return `${yrs} ${yrs === 1 ? "year" : "years"} and ${mos} ${mos === 1 ? "month" : "months"}`;
    }
    return null;
  })();

  return (
    <>
    <CalculatorLifecycle
      calculatorId="hybrid_vs_petrol"
      category="vehicles"
      hasResult={!!result}
      unitSystem={unit}
    />
    <CalculatorShell
      title="Hybrid vs Petrol"
      description="Vehicle running-cost decision: when does the hybrid purchase premium pay back in fuel and maintenance savings?"
      toolbar={
        <UnitToggle
          value={unit}
          onChange={switchUnit}
          metricLabel="km / L/100km"
          imperialLabel="Miles / MPG"
        />
      }
      results={
        result ? (
          <div className="space-y-4">
            {result.neverBreaksEven ? (
              <div className="p-5 rounded-xl border bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                  Break-even
                </p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  Hybrid may not break even at this mileage
                </p>
              </div>
            ) : (
              <div className="p-5 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <p className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wide mb-1">
                  Break-even
                </p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">{breakEvenDisplay}</p>
              </div>
            )}
            <ResultGrid columns={2}>
              <ResultCard
                label="Annual fuel savings"
                value={`${result.annualFuelSavings >= 0 ? "" : "-"}${fmtCurrency(result.annualFuelSavings)}/yr`}
                hint={`Hybrid ${fmtCurrency(result.vehicleA.annualFuelCost)} · Petrol ${fmtCurrency(result.vehicleB.annualFuelCost)}`}
                tone="info"
              />
              <ResultCard
                label="Annual total savings"
                value={`${result.annualTotalSavings >= 0 ? "" : "-"}${fmtCurrency(result.annualTotalSavings)}/yr`}
                hint={`Includes ${fmtCurrency(parseFloat(maintenanceSavings) || 0)}/yr maintenance advantage`}
                tone="primary"
              />
            </ResultGrid>
            <ResultGrid columns={2}>
              <ResultCard
                label="Net after 5 years"
                value={`${result.savings5yr >= 0 ? "+" : "-"}${fmtCurrency(result.savings5yr)}`}
                tone={result.savings5yr >= 0 ? "success" : "neutral"}
              />
              <ResultCard
                label="Net after 10 years"
                value={`${result.savings10yr >= 0 ? "+" : "-"}${fmtCurrency(result.savings10yr)}`}
                tone={result.savings10yr >= 0 ? "success" : "neutral"}
              />
            </ResultGrid>
          </div>
        ) : incompleteHint ? (
          <p
            className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3"
            role="status"
          >
            {incompleteHint}
          </p>
        ) : null
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Built on the Vehicle Running Cost foundation (`calculateVehicleComparison`). Annual fuel
              uses Trip Fuel primitives; break-even = purchase premium ÷ (fuel savings + maintenance
              advantage). Claims are calculation-based only.
            </p>
          </Methodology>
          <Disclaimer variant="planning" />
        </div>
      }
    >
      <div className="mb-6">
        <InputGroup
          label={`Annual ${unit === "imperial" ? "miles" : "km"}`}
          type="number"
          min="0"
          value={annualDistance}
          onChange={(e) => setAnnualDistance(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Hybrid
          </h3>
          <InputGroup
            label="Purchase price ($)"
            type="number"
            min="0"
            value={hybridPrice}
            onChange={(e) => setHybridPrice(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Fuel economy (MPG)" : "Fuel use (L/100km)"}
            type="number"
            min="0"
            step="0.1"
            value={hybridEfficiency}
            onChange={(e) => setHybridEfficiency(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
            Petrol
          </h3>
          <InputGroup
            label="Purchase price ($)"
            type="number"
            min="0"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Fuel economy (MPG)" : "Fuel use (L/100km)"}
            type="number"
            min="0"
            step="0.1"
            value={gasEfficiency}
            onChange={(e) => setGasEfficiency(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <InputGroup
          label={unit === "imperial" ? "Fuel price / gallon" : "Fuel price / litre"}
          type="number"
          min="0"
          step="0.01"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />
        <InputGroup
          label="Hybrid annual maintenance advantage ($)"
          type="number"
          min="0"
          value={maintenanceSavings}
          onChange={(e) => setMaintenanceSavings(e.target.value)}
          hint="Typically ~$200–$500/yr"
        />
      </div>
    </CalculatorShell>
    </>
  );
}
