export default function ResultCard({ title, children }) {
  return (
    <div className="card p-6">
      {title && <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>}
      <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}
