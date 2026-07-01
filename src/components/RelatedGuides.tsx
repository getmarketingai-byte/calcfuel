import Link from "next/link";

export interface RelatedGuide {
  title: string;
  slug: string;
  description: string;
}

export default function RelatedGuides({ guides }: { guides: RelatedGuide[] }) {
  return (
    <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/blog/${guide.slug}`}
            className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:shadow-md transition-all group"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors text-sm">
              {guide.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{guide.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
