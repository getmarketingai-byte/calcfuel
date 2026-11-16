import { TOWING_SOURCES, TRAILER_PENALTIES } from "@/domain/models/towingTrip";

/**
 * The calculator's towing presets with the published source behind each, plus the full
 * source list. Shared by the towing calculator, the /towing hub and the caravan article so
 * the three can never disagree.
 */
export default function TowingEvidence({ showSources = true }: { showSources?: boolean }) {
  return (
    <div className="not-prose my-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">
            Towing fuel penalty presets used by the CalcFuel towing calculator, and their basis.
          </caption>
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
              <th className="py-2 pr-3">Trailer</th>
              <th className="py-2 pr-3">Preset</th>
              <th className="py-2">Basis</th>
            </tr>
          </thead>
          <tbody>
            {TRAILER_PENALTIES.map((t) => (
              <tr key={t.id} className="border-b border-gray-200 dark:border-gray-700 align-top">
                <td className="py-2 pr-3 text-gray-900 dark:text-white">{t.label}</td>
                <td className="py-2 pr-3 font-semibold text-gray-900 dark:text-white">+{t.penaltyPercent}%</td>
                <td className="py-2 text-gray-700 dark:text-gray-300">{t.basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSources ? (
        <div className="mt-4 text-xs text-gray-700 dark:text-gray-300">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Published sources</p>
          <ul className="list-disc pl-5 space-y-1">
            {Object.values(TOWING_SOURCES).map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {s.name}
                </a>{" "}
                ({s.date}): {s.finding}
              </li>
            ))}
          </ul>
          <p className="mt-2">
            The sources genuinely range from about +20% (a small empty box trailer) to roughly +100% (heavy vans at
            highway speed). Your own combination, speed and terrain decide where you sit — log a few full-tank fills
            towing and enter your own figure as a custom penalty.
          </p>
        </div>
      ) : null}
    </div>
  );
}
