export default function Footer() {
  return (
    <footer className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 transition-colors duration-200 mt-auto">
      <div className="container px-6 py-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
            Built by{' '}
            <a 
              href="https://www.shahinasareen.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
            >
              Shahina Sareen
            </a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-200">
            © {new Date().getFullYear()} AI Project Builder. Generate your next project in seconds.
          </p>
        </div>
      </div>
    </footer>
  )
}