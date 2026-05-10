"use client";

import { useState } from "react";

export default function TipCalc() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [customTip, setCustomTip] = useState("");

  const presets = ["10", "12", "15", "18", "20"];
  const isCustom = !presets.includes(tipPercent);

  const billAmt = parseFloat(bill) || 0;
  const tipPct = isCustom ? (parseFloat(customTip) || 0) : (parseFloat(tipPercent) || 0);
  const numPeople = Math.max(1, parseInt(people) || 1);

  const tipAmount = billAmt * (tipPct / 100);
  const total = billAmt + tipAmount;
  const perPerson = total / numPeople;
  const tipPerPerson = tipAmount / numPeople;

  const fmt = (n: number) =>
    n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Bill amount ($)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tip percentage</label>
          <div className="flex gap-2 flex-wrap">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => { setTipPercent(p); setCustomTip(""); }}
                className={`py-2 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                  tipPercent === p && !isCustom
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
                }`}
              >
                {p}%
              </button>
            ))}
            <div className="relative flex items-center">
              <input
                type="number"
                min="0"
                max="100"
                value={customTip}
                onChange={(e) => { setCustomTip(e.target.value); setTipPercent("custom"); }}
                placeholder="Custom %"
                className={`w-24 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  isCustom && customTip ? "border-orange-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Number of people</label>
          <input
            type="number"
            min="1"
            max="100"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-32 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
          />
        </div>

        {billAmt > 0 && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tip amount</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{fmt(tipAmount)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total bill</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{fmt(total)}</p>
              </div>
              {numPeople > 1 && (
                <>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tip per person</p>
                    <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{fmt(tipPerPerson)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total per person</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(perPerson)}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
