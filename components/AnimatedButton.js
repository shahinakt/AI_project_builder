export default function AnimatedButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl " +
        "focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-500 btn-float font-medium whitespace-nowrap text-sm sm:text-base " +
        className
      }
    >
      {children}
    </button>
  );
}
