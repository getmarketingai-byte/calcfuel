export interface SourceItem {
  label: string;
  href?: string;
  note?: string;
}

interface SourcesProps {
  title?: string;
  sources: SourceItem[];
}

export default function Sources({ title = "Sources", sources }: SourcesProps) {
  if (sources.length === 0) return null;
  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <ul className="space-y-1 list-disc list-inside">
        {sources.map((s) => (
          <li key={s.label + (s.href ?? "")}>
            {s.href ? (
              <a href={s.href} className="text-orange-600 dark:text-orange-400 hover:underline" rel="noopener noreferrer">
                {s.label}
              </a>
            ) : (
              <span>{s.label}</span>
            )}
            {s.note ? <span className="text-gray-500"> — {s.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
