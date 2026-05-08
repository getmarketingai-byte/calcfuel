"use client";

import { useState } from "react";

type Mode = "add" | "remove";

export default function GSTCalc() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<Mode>("add");
  const [rate, setRate] = useState("10");

  const parsedAmount = parseFloat(amount.replace(/,/g, "")) || 0;
  const parsedRate = parseFloat(rate) || 10;
  const multiplier = parsedRate / 100;

  let priceExGST = 0;
  let gstAmount = 0;
  let priceIncGST = 0;

  if (mode === "add") {
    priceExGST = parsedAmount;
    gstAmount = parsedAmount * multiplier;
    priceIncGST = parsedAmount + gstAmount;
  } else {
    priceIncGST = parsedAmount;
    priceExGST = parsedAmount / (1 + multiplier);
    gstAmount = priceIncGST - priceExGST;
  }

  const fmt = (n: number) =>
    n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">What do you want to do?</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode("add")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                mode === "add"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
              }`}
            >
              Add GST to price
            </button>
            <button
              onClick={() => setMode("remove")}
              className={`py-2.5 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                mode === "remove"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
              }`}
            >
              Remove GST from price
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {mode === "add" ? "Price before GST (ex-GST)" : "Price including GST (inc-GST)"}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">GST Rate (%)</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-32 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
            <span className="text-gray-500 dark:text-gray-400 text-sm">Standard Australian GST = 10%</span>
          </div>
        </div>
      </div>
      {parsedAmount > 0 && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price ex-GST</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(priceExGST)}</p>
            </div>
            <div className="text-center bg-orange-50 dark:bg-orange-950 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">GST Amount ({parsedRate}%)</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{fmt(gstAmount)}</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price inc-GST</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(priceIncGST)}</p>
            </div>
          </div>
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
            Based on {parsedRate}% GST rate. Standard Australian GST rate is 10%.
          </p>
        </div>
      )}
    </div>
  );
}
