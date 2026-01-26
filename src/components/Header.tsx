import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { UserProfileCompact } from './UserProfile';

const navLinks = [
  { label: 'Leaderboard', href: '/#leaderboard' },
  { label: 'Iran', href: '/iran' },
  { label: 'Token', href: '/token' },
  { label: 'Docs', href: '/docs' },
  { label: 'DAO', href: 'https://miga.us.org', external: true },
];

// Mint progress - fetched from API in production
const MINT_PROGRESS = 23; // percentage
const MINT_TARGET = '$7,000,000'; // USD target

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8">
      <nav className="nav-glass max-w-[1600px] mx-auto py-4 px-8 rounded-3xl transition-all duration-300">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <img
              src="/images/migacoin.png"
              alt="MIGA Protocol"
              className="w-14 h-14 rounded-full object-cover transition-transform group-hover:scale-105 shadow-lg shadow-[#FFD700]/20"
            />
            <span className="text-2xl font-bold tracking-tight text-[#EDEDF2]">
              MIGA Protocol
            </span>
          </Link>

          {/* Desktop Nav - Center */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link text-xl font-semibold px-6 py-3 rounded-xl hover:bg-white/[0.08] transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link text-xl font-semibold px-6 py-3 rounded-xl hover:bg-white/[0.08] transition-all"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="nav-link text-xl font-semibold px-6 py-3 rounded-xl hover:bg-white/[0.08] transition-all"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right side - Mint CTA + Profile */}
          <div className="hidden md:flex items-center gap-4">
            {/* Active chain indicator - LEFT of mint button */}
            <span className="text-base text-[#14F195] hidden lg:flex items-center gap-2 font-semibold">
              <span className="w-3 h-3 bg-[#14F195] rounded-full animate-pulse" />
              7 Chains Live
            </span>
            <Link
              to="/mint"
              className="relative group"
            >
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-lg px-8 py-3 rounded-full hover:shadow-xl hover:shadow-[#FFD700]/30 transition-all">
                <span>Mint</span>
                <span className="text-sm opacity-80">{MINT_PROGRESS}%</span>
              </div>
              {/* Progress bar */}
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black/40 transition-all"
                  style={{ width: `${MINT_PROGRESS}%` }}
                />
              </div>
            </Link>
            {/* User Profile / Connect Wallet */}
            <UserProfileCompact />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/mint"
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold px-3 py-1.5 rounded-full text-sm"
            >
              <span>Mint</span>
              <span className="text-xs opacity-80">{MINT_PROGRESS}%</span>
            </Link>
            <button
              className="p-2 text-[#B8B8C6] hover:text-[#EDEDF2] transition-colors rounded-lg hover:bg-white/[0.03]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.04]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="nav-link px-4 py-3 rounded-lg hover:bg-white/[0.03]"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="nav-link px-4 py-3 rounded-lg hover:bg-white/[0.03]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="nav-link px-4 py-3 rounded-lg hover:bg-white/[0.03]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
