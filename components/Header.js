import DarkModeToggle from './DarkModeToggle'
import Logo from './Logo'

export default function Header({ title = "AI Project Builder" }) {
  return (
    <header className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">{title}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">Generate project folders, DFD, architecture & starter code</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
