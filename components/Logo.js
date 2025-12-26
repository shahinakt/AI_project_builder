export default function Logo({ className = "" }) {
  return (
    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md ${className}`}>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path 
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
          fill="currentColor"
        />
        <circle cx="9" cy="9" r="1" fill="currentColor" opacity="0.7"/>
        <circle cx="15" cy="9" r="1" fill="currentColor" opacity="0.7"/>
        <circle cx="12" cy="15" r="1" fill="currentColor" opacity="0.7"/>
        <path 
          d="M9 9l3 6m3-6l-3 6m-3-6h6" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          opacity="0.5"
        />
      </svg>
    </div>
  )
}