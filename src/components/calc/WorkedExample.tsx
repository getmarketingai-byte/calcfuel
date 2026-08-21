/**
 * A concrete scenario run through the calculator, with the arithmetic shown.
 *
 * Every calculator carries one, and no two share a scenario. This is the section that
 * demonstrates the tool was built by someone who used it, rather than generated —
 * so the numbers must be real outputs of the page's own formula, not illustrative
 * round figures. Enforced by AC12 in `npm run audit:adsense`.
 */

export interface WorkedStep {
  /** What is being computed at this step. */
  label: string;
  /** The arithmetic, written out. */
  math: string;
  /** The result of this step, formatted. */
  result: string;
}

interface WorkedExampleProps {
  /** One or two sentences setting up a specific, plausible situation. */
  scenario: string;
  inputs: { label: string; value: string }[];
  steps: WorkedStep[];
  /** The headline answer. */
  answer: string;
  /** What the number means for the decision — not a restatement of the answer. */
  takeaway: string;
}

export default function WorkedExample({
  scenario,
  inputs,
  steps,
  answer,
  takeaway,
}: WorkedExampleProps) {
  return (
    <section className="mt-10" aria-labelledby="worked-example">
      <h2
        id="worked-example"
        className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
      >
        Worked example
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-5">{scenario}</p>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-900 px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Inputs</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {inputs.map((i) => (
              <div key={i.label} className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 py-1">
                <dt className="text-gray-700 dark:text-gray-300">{i.label}</dt>
                <dd className="font-medium text-gray-900 dark:text-white text-right">{i.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <StepDiagram steps={steps} answer={answer} />

        <div className="px-5 py-4">
          <ol className="space-y-3 text-sm">
            {steps.map((s, i) => (
              <li key={s.label} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-orange-700 text-white text-xs font-semibold grid place-items-center">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-medium text-gray-900 dark:text-white">{s.label}</span>
                  <span className="block font-mono text-xs text-gray-700 dark:text-gray-300 mt-0.5">
                    {s.math} = <strong className="text-gray-900 dark:text-white">{s.result}</strong>
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 bg-orange-50 dark:bg-orange-950/40 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{answer}</p>
          <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">{takeaway}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Inline SVG showing the calculation as a chain of steps. Rendered server-side so it
 * is in the initial HTML and costs no JavaScript.
 */
function StepDiagram({ steps, answer }: { steps: WorkedStep[]; answer: string }) {
  const boxes = [...steps.map((s) => s.result), "Result"];
  const w = 640;
  const boxW = Math.min(140, (w - 40 - (boxes.length - 1) * 24) / boxes.length);
  const gap = (w - 40 - boxes.length * boxW) / Math.max(1, boxes.length - 1);
  const h = 96;

  return (
    <div className="overflow-x-auto border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-5 py-4">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        role="img"
        aria-label={`Calculation chain: ${steps.map((s) => s.label).join(", then ")}, giving ${answer}`}
        className="min-w-[480px] text-gray-700 dark:text-gray-200"
      >
        <title>How this example is calculated</title>
        <desc>
          Each step feeds the next: {steps.map((s) => `${s.label} gives ${s.result}`).join("; ")}.
        </desc>
        {boxes.map((label, i) => {
          const x = 20 + i * (boxW + gap);
          const isLast = i === boxes.length - 1;
          return (
            <g key={i}>
              <rect
                x={x}
                y={26}
                width={boxW}
                height={44}
                rx="8"
                className={
                  isLast
                    ? "fill-orange-100 stroke-orange-500 dark:fill-orange-950 dark:stroke-orange-500"
                    : "fill-gray-50 stroke-gray-300 dark:fill-gray-900 dark:stroke-gray-600"
                }
                strokeWidth="1.5"
              />
              <text
                x={x + boxW / 2}
                y={44}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                opacity="0.75"
              >
                {isLast ? "Answer" : `Step ${i + 1}`}
              </text>
              <text
                x={x + boxW / 2}
                y={60}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="currentColor"
              >
                {truncate(label, Math.floor(boxW / 6.5))}
              </text>
              {!isLast ? (
                <path
                  d={`M ${x + boxW + 4} 48 L ${x + boxW + gap - 6} 48`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#we-arrow)"
                  opacity="0.5"
                />
              ) : null}
            </g>
          );
        })}
        <defs>
          <marker id="we-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" opacity="0.5" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, Math.max(1, n - 1))}…` : s;
}
