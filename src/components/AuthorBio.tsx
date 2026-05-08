type AuthorBioProps = {
  name: string;
  role: string;
  bio: string;
};

export default function AuthorBio({ name, role, bio }: AuthorBioProps) {
  return (
    <aside className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5">
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
        About the author
      </p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{bio}</p>
    </aside>
  );
}
