import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Iran', href: '/iran' },
  { label: 'Token', href: '/token' },
  { label: 'Vote', href: '/vote' },
  { label: 'Docs', href: '/docs' },
  { label: 'DAO', href: '/dao' },
];

// Mint progress (update this as mint progresses)
const MINT_PROGRESS = 23; // percentage

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
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6">
      <nav className="nav-glass max-w-[1200px] mx-auto py-2 px-4 rounded-2xl transition-all duration-300">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/images/migacoin.png"
              alt="MIGA Protocol"
              className="w-8 h-8 rounded-full object-cover transition-transform group-hover:scale-105"
            />
            <span className="text-base font-semibold tracking-tight text-[#EDEDF2]">
              MIGA Protocol
            </span>
          </Link>

          {/* Desktop Nav - Center */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link px-4 py-2 rounded-lg hover:bg-white/[0.03]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link px-4 py-2 rounded-lg hover:bg-white/[0.03]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="nav-link px-4 py-2 rounded-lg hover:bg-white/[0.03]"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right side - Mint CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Active chain indicator - LEFT of mint button */}
            <span className="text-sm text-[#14F195] hidden lg:flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 bg-[#14F195] rounded-full animate-pulse" />
              Solana Live
            </span>
            <a
              href="https://jup.ag/swap/SOL-MIGA"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold px-5 py-2 rounded-full hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all">
                <span>Mint</span>
                <span className="text-xs opacity-80">{MINT_PROGRESS}%</span>
              </div>
              {/* Progress bar */}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black/40 transition-all"
                  style={{ width: `${MINT_PROGRESS}%` }}
                />
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://jup.ag/swap/SOL-MIGA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold px-3 py-1.5 rounded-full text-sm"
            >
              <span>Mint</span>
              <span className="text-xs opacity-80">{MINT_PROGRESS}%</span>
            </a>
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
