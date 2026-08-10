interface MethodologyProps {
  title?: string;
  children: React.ReactNode;
}

export default function Methodology({ title = "How this calculation works", children }: MethodologyProps) {
  return (
    <details className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-white list-none flex items-center justify-between">
        {title}
        <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
      </summary>
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">{children}</div>
    </details>
  );
}
