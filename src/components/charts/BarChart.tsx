/**
 * Server-rendered inline SVG bar chart.
 *
 * Deliberately not a charting library: these render in the initial HTML, cost no
 * JavaScript, and are readable by a crawler. `currentColor` and Tailwind text
 * utilities carry the theme, so no colour is hard-coded except the series fill.
 */

export interface BarDatum {
  label: string;
  value: number;
  /** Optional second series drawn behind the main bar for comparison. */
  compare?: number;
  highlight?: boolean;
}

interface BarChartProps {
  data: BarDatum[];
  /** Accessible title — also rendered as the SVG <title>. */
  title: string;
  /** Longer description for screen readers, rendered as <desc>. */
  description: string;
  unitSuffix?: string;
  /** Legend label for `value`. */
  seriesLabel?: string;
  /** Legend label for `compare`. */
  compareLabel?: string;
  /** Decimal places on the value labels. */
  precision?: number;
}

export default function BarChart({
  data,
  title,
  description,
  unitSuffix = "",
  seriesLabel,
  compareLabel,
  precision = 1,
}: BarChartProps) {
  const rowHeight = 30;
  const gap = 10;
  const labelWidth = 96;
  const valueWidth = 62;
  const chartWidth = 560;
  const plotWidth = chartWidth - labelWidth - valueWidth;
  const height = data.length * (rowHeight + gap) + 8;
  const max = Math.max(...data.flatMap((d) => [d.value, d.compare ?? 0])) * 1.02;

  return (
    <figure className="my-8 not-prose">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          width="100%"
          role="img"
          aria-labelledby={`${slug(title)}-title ${slug(title)}-desc`}
          className="min-w-[420px] text-gray-700 dark:text-gray-200"
        >
          <title id={`${slug(title)}-title`}>{title}</title>
          <desc id={`${slug(title)}-desc`}>{description}</desc>
          {data.map((d, i) => {
            const y = i * (rowHeight + gap);
            const w = Math.max(2, (d.value / max) * plotWidth);
            const cw = d.compare ? Math.max(2, (d.compare / max) * plotWidth) : 0;
            return (
              <g key={d.label}>
                <text
                  x={labelWidth - 8}
                  y={y + rowHeight / 2 + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="currentColor"
                >
                  {d.label}
                </text>
                {d.compare ? (
                  <rect
                    x={labelWidth}
                    y={y + 3}
                    width={cw}
                    height={rowHeight - 6}
                    rx="3"
                    className="fill-gray-300 dark:fill-gray-600"
                  />
                ) : null}
                <rect
                  x={labelWidth}
                  y={d.compare ? y + 8 : y + 4}
                  width={w}
                  height={d.compare ? rowHeight - 16 : rowHeight - 8}
                  rx="3"
                  className={
                    d.highlight
                      ? "fill-orange-600 dark:fill-orange-400"
                      : "fill-sky-700 dark:fill-sky-400"
                  }
                />
                <text
                  x={labelWidth + Math.max(w, cw) + 8}
                  y={y + rowHeight / 2 + 4}
                  fontSize="12"
                  fill="currentColor"
                >
                  {d.value.toFixed(precision)}
                  {unitSuffix}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {seriesLabel ? (
        <figcaption className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-700 dark:text-gray-300">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-sm bg-sky-700 dark:bg-sky-400" />
            {seriesLabel}
          </span>
          {compareLabel ? (
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-4 rounded-sm bg-gray-300 dark:bg-gray-600" />
              {compareLabel}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
