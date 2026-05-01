import Link from "next/link";

export interface RelatedTool { title: string; slug: string; description: string; }

export default function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Marketing Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/calculators/${tool.slug}`}
            className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:shadow-md transition-all group">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors text-sm">{tool.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
