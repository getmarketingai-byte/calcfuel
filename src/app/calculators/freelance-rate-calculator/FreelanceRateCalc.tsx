"use client";

import { useMemo, useState } from "react";

type IncomeMode = "take-home" | "gross";

export default function FreelanceRateCalc() {
  const [incomeMode, setIncomeMode] = useState<IncomeMode>("take-home");
  const [targetIncome, setTargetIncome] = useState("");
  const [annualExpenses, setAnnualExpenses] = useState("");
  const [taxBuffer, setTaxBuffer] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("30");
  const [weeksPerYear, setWeeksPerYear] = useState("48");
  const [hoursPerDay, setHoursPerDay] = useState("7.5");
  const [gstRegistered, setGstRegistered] = useState(false);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  const result = useMemo(() => {
    const target = parseFloat(targetIncome) || 0;
    const expenses = parseFloat(annualExpenses) || 0;
    const buffer = parseFloat(taxBuffer) || 0;
    const hpw = parseFloat(hoursPerWeek) || 0;
    const weeks = parseFloat(weeksPerYear) || 0;
    const hpd = parseFloat(hoursPerDay) || 0;

    if (target <= 0 || hpw <= 0 || weeks <= 0) return null;

    const bufferFactor = 1 - buffer / 100;
    if (bufferFactor <= 0) return null;

    let requiredGross: number;
    if (incomeMode === "take-home") {
      requiredGross = expenses + target / bufferFactor;
    } else {
      requiredGross = target + expenses;
    }

    const annualBillableHours = hpw * weeks;
    const hourly = requiredGross / annualBillableHours;
    const daily = hourly * hpd;
    const hourlyGst = gstRegistered ? hourly * 1.1 : null;
    const dailyGst = gstRegistered ? daily * 1.1 : null;

    return {
      requiredGross,
      annualBillableHours,
      hourly,
      daily,
      hourlyGst,
      dailyGst,
    };
  }, [incomeMode, targetIncome, annualExpenses, taxBuffer, hoursPerWeek, weeksPerYear, hoursPerDay, gstRegistered]);

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Income goal type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIncomeMode("take-home")}
              className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-colors ${
                incomeMode === "take-home"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
              }`}
            >
              Target take-home (after tax)
            </button>
            <button
              type="button"
              onClick={() => setIncomeMode("gross")}
              className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-colors ${
                incomeMode === "gross"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
              }`}
            >
              Gross revenue goal
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {incomeMode === "take-home" ? "Target annual take-home (AUD)" : "Target annual gross revenue (AUD)"}
            </label>
            <input
              type="number"
              min="0"
              value={targetIncome}
              onChange={(e) => setTargetIncome(e.target.value)}
              placeholder="e.g. 80000"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Annual business expenses (AUD)
            </label>
            <input
              type="number"
              min="0"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
              placeholder="e.g. 5000"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Tax &amp; super buffer (%)
            </label>
            <input
              type="number"
              min="0"
              max="99"
              step="1"
              value={taxBuffer}
              onChange={(e) => setTaxBuffer(e.target.value)}
              className={inputClass}
            />
            <p className="text-xs text-gray-500 mt-1">Default 30% for AU sole traders</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Billable hours per week
            </label>
            <input
              type="number"
              min="1"
              step="0.5"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Weeks worked per year
            </label>
            <input
              type="number"
              min="1"
              max="52"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Billable hours per day
            </label>
            <input
              type="number"
              min="1"
              step="0.5"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer py-2.5">
              <input
                type="checkbox"
                checked={gstRegistered}
                onChange={(e) => setGstRegistered(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                GST-registered — show 10% inclusive quote rates
              </span>
            </label>
          </div>
        </div>

        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Required hourly rate (ex-GST)</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.hourly)}/hr</p>
              {result.hourlyGst !== null && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  GST-inclusive quote: {fmt(result.hourlyGst)}/hr
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Daily rate (ex-GST)</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.daily)}/day</p>
                {result.dailyGst !== null && (
                  <p className="text-xs text-gray-500 mt-1">Inc-GST: {fmt(result.dailyGst)}/day</p>
                )}
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Required annual revenue</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.requiredGross)}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Annual billable hours</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {result.annualBillableHours.toLocaleString("en-AU", { maximumFractionDigits: 0 })} hrs
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
