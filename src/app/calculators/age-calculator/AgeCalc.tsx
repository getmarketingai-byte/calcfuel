"use client";

import { useState } from "react";

export default function AgeCalc() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");

  const today = new Date();
  const refDate = asOf ? new Date(asOf) : today;
  const birthDate = dob ? new Date(dob) : null;

  let years = 0, months = 0, days = 0;
  let nextBirthday: Date | null = null;
  let daysToNext = 0;
  let totalDays = 0;

  if (birthDate && !isNaN(birthDate.getTime()) && birthDate < refDate) {
    years = refDate.getFullYear() - birthDate.getFullYear();
    const mDiff = refDate.getMonth() - birthDate.getMonth();
    if (mDiff < 0 || (mDiff === 0 && refDate.getDate() < birthDate.getDate())) {
      years--;
    }

    const lastBirthday = new Date(refDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (lastBirthday > refDate) {
      lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
    }

    months = refDate.getMonth() - lastBirthday.getMonth();
    if (months < 0) months += 12;

    const temp = new Date(lastBirthday);
    temp.setMonth(temp.getMonth() + months);
    days = Math.floor((refDate.getTime() - temp.getTime()) / (1000 * 60 * 60 * 24));

    totalDays = Math.floor((refDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

    nextBirthday = new Date(refDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday <= refDate) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    daysToNext = Math.ceil((nextBirthday.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Date of birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={today.toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Age as of <span className="text-gray-400 font-normal">(optional — defaults to today)</span>
            </label>
            <input
              type="date"
              value={asOf}
              onChange={(e) => setAsOf(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {birthDate && years >= 0 && birthDate < refDate && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5">
            <div className="text-center mb-4">
              <p className="text-5xl font-bold text-orange-600 dark:text-orange-400">{years}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">years old</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{years}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Years</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{months}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Months</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{days}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Days</p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>Total days lived: <strong className="text-gray-900 dark:text-white">{totalDays.toLocaleString()}</strong></p>
              {nextBirthday && (
                <p>Next birthday: <strong className="text-gray-900 dark:text-white">{fmtDate(nextBirthday)}</strong> ({daysToNext} days away)</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
