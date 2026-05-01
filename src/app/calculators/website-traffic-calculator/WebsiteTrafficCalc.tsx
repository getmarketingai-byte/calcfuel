"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function WebsiteTrafficCalc() {
  const [sessions, setSessions] = useState("");
  const [bounceRate, setBounceRate] = useState("");
  const [pagesPerSession, setPagesPerSession] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [result, setResult] = useState<{
    engagedSessions: number;
    totalPageviews: number;
    estimatedReadTime: number;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const s = parseFloat(sessions), br = parseFloat(bounceRate), pps = parseFloat(pagesPerSession), dur = parseFloat(sessionDuration);
      if (!sessions && !bounceRate && !pagesPerSession && !sessionDuration) { setResult(null); setError(""); return; }
      if (!s || s <= 0) { setError("Please enter a valid number of monthly sessions."); setResult(null); return; }
      if (isNaN(br) || br < 0 || br > 100) { setError("Bounce rate must be between 0 and 100%."); setResult(null); return; }
      if (!pps || pps <= 0) { setError("Please enter a valid pages per session value."); setResult(null); return; }
      if (!dur || dur <= 0) { setError("Please enter a valid session duration."); setResult(null); return; }
      const engageRate = (100 - br) / 100;
      const engagedSessions = s * engageRate;
      const totalPageviews = s * pps;
      const estimatedReadTime = (engagedSessions * dur) / 60; // in hours
      setError("");
      setResult({ engagedSessions, totalPageviews, estimatedReadTime });
      trackCalculation("website_traffic", { sessions: s, bounce_rate: br, pages_per_session: pps, session_duration: dur, engaged_sessions: Math.round(engagedSessions), total_pageviews: Math.round(totalPageviews) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [sessions, bounceRate, pagesPerSession, sessionDuration]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Analyse Your Website Traffic</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Sessions</label>
          <input type="number" inputMode="numeric" min="0" value={sessions} onChange={e => setSessions(e.target.value)} placeholder="e.g. 10000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bounce Rate (%)</label>
          <input type="number" inputMode="decimal" min="0" max="100" value={bounceRate} onChange={e => setBounceRate(e.target.value)} placeholder="e.g. 55"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg Pages Per Session</label>
          <input type="number" inputMode="decimal" min="1" value={pagesPerSession} onChange={e => setPagesPerSession(e.target.value)} placeholder="e.g. 3.2"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg Session Duration (minutes)</label>
          <input type="number" inputMode="decimal" min="0" value={sessionDuration} onChange={e => setSessionDuration(e.target.value)} placeholder="e.g. 2.5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Engaged Sessions</p>
            <p className="text-3xl font-bold text-orange-500">{Math.round(result.engagedSessions).toLocaleString()}</p>
            <p className="mt-1 text-xs text-gray-400">non-bounce visitors</p>
          </div>
          <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Pageviews</p>
            <p className="text-3xl font-bold text-blue-600">{Math.round(result.totalPageviews).toLocaleString()}</p>
          </div>
          <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Est. Monthly Read Time</p>
            <p className="text-3xl font-bold text-green-600">{Math.round(result.estimatedReadTime).toLocaleString()}</p>
            <p className="mt-1 text-xs text-gray-400">hours/month</p>
          </div>
        </div>
      )}
    </div>
  );
}
