import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Token', href: '#token' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Governance', href: '#governance' },
];

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#07070A]/90 backdrop-blur-xl border-b border-white/5' : ''
    }`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              MIGA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA - Join DAO button */}
          <div className="hidden md:flex items-center">
            <a
              href="#join"
              className="px-6 py-2.5 border-2 border-[#FFD700] text-[#FFD700] font-semibold rounded-lg hover:bg-[#FFD700] hover:text-black transition-all"
            >
              Join DAO
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5 bg-[#07070A]/95 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#join"
                className="mt-4 px-6 py-3 border-2 border-[#FFD700] text-[#FFD700] font-semibold rounded-lg text-center hover:bg-[#FFD700] hover:text-black transition-all"
                onClick={() => setIsOpen(false)}
              >
                Join DAO
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
