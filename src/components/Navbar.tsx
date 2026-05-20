import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { currentUser } from '../data/mockData';

const navLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Report Issue', path: '/report' },
  { label: 'Polls', path: '/polls' },
  { label: 'Feedback', path: '/feedback' },
  { label: 'My Reports', path: '/my-reports' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <div>
              <span className="font-bold text-primary-800 text-lg leading-none">CivicPulse</span>
              <span className="block text-xs text-slate-400 leading-none">by Project SmartCity</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 cursor-pointer group">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-700 font-semibold text-sm">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800 leading-none">{currentUser.name}</span>
                <span className="flex items-center gap-0.5 text-xs text-slate-400 leading-tight mt-0.5">
                  <MapPin size={10} />
                  {currentUser.constituency}
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
            </div>
          </div>

          <button
            className="md:hidden p-2 text-slate-500 hover:text-slate-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
