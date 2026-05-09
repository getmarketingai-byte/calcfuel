"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Mode = "add" | "remove";

export default function GSTCalc() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<{ exGst: number; gst: number; incGst: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!amount) { setResult(null); setError(""); return; }
      const val = parseFloat(amount);
      if (isNaN(val) || val < 0) { setError("Please enter a valid amount."); setResult(null); return; }
      setError("");
      let exGst: number, gst: number, incGst: number;
      if (mode === "add") {
        exGst = val;
        gst = val * 0.1;
        incGst = val * 1.1;
      } else {
        incGst = val;
        exGst = val / 1.1;
        gst = val / 11;
      }
      setResult({ exGst, gst, incGst });
      trackCalculation("gst_calculator", { mode, amount: val, gst_amount: gst });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [amount, mode]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Australian GST Calculator</h2>

      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-6 w-fit">
        <button
          onClick={() => { setMode("add"); setAmount(""); setResult(null); }}
          className={`px-6 py-2 text-sm font-medium transition-colors ${mode === "add" ? "bg-orange-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
        >
          Add GST
        </button>
        <button
          onClick={() => { setMode("remove"); setAmount(""); setResult(null); }}
          className={`px-6 py-2 text-sm font-medium transition-colors ${mode === "remove" ? "bg-orange-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
        >
          Remove GST
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {mode === "add" ? "Price excluding GST (AUD)" : "Price including GST (AUD)"}
        </label>
        <div className="flex items-center gap-2 max-w-xs">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">$</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={mode === "add" ? "e.g. 100.00" : "e.g. 110.00"}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">GST rate: 10% (Australian standard)</p>
      </div>

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-live="polite">
          <div className={`p-5 rounded-xl border ${mode === "add" ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"}`}>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Price (ex-GST)</p>
            <p className={`text-3xl font-bold ${mode === "add" ? "text-orange-500" : "text-gray-900 dark:text-white"}`}>{fmt(result.exGst)}</p>
            <p className="mt-2 text-xs text-gray-500">before tax</p>
          </div>
          <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">GST Amount (10%)</p>
            <p className="text-3xl font-bold text-blue-600">{fmt(result.gst)}</p>
            <p className="mt-2 text-xs text-gray-500">tax component</p>
          </div>
          <div className={`p-5 rounded-xl border ${mode === "remove" ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800" : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"}`}>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Price (inc-GST)</p>
            <p className={`text-3xl font-bold ${mode === "remove" ? "text-orange-500" : "text-green-600"}`}>{fmt(result.incGst)}</p>
            <p className="mt-2 text-xs text-gray-500">total with tax</p>
          </div>
        </div>
      )}

      {result && (
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          {mode === "add"
            ? `Add $${fmt(result.gst)} GST to ${fmt(result.exGst)} → total ${fmt(result.incGst)}`
            : `${fmt(result.incGst)} includes ${fmt(result.gst)} GST → base price ${fmt(result.exGst)}`}
        </p>
      )}
    </div>
  );
}
