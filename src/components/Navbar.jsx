import { Link, NavLink } from 'react-router-dom'
import { MapPin, Hospital, Settings } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-white font-semibold">
          <Hospital className="w-6 h-6 text-blue-400" />
          <span>BedFinder</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <NavLink to="/" className={({isActive})=>`hover:text-white transition ${isActive? 'text-white':''}`}>Explore</NavLink>
          <NavLink to="/admin" className={({isActive})=>`hover:text-white transition inline-flex items-center gap-2 ${isActive? 'text-white':''}`}>
            <Settings className="w-4 h-4" /> Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
