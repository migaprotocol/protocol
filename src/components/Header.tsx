import { Link } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

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

  const navLinks = [
    { href: '#problem', label: 'Problem' },
    { href: '#solution', label: 'Solution' },
    { href: '#token', label: 'Token' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#governance', label: 'Governance' },
    { href: '#join', label: 'Join DAO' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#07070A]/90 backdrop-blur-xl border-b border-white/5' : ''
    }`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/migacoin.png"
              alt="MIGA"
              className="w-10 h-10 rounded-full object-cover shadow-lg shadow-[#FFD700]/20"
            />
            <span className="text-xl font-bold text-white">MIGA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side - Wallet Connect */}
          <div className="hidden md:flex items-center gap-4">
            <WalletMultiButton className="!bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-semibold !rounded-full !px-6 !py-2.5 !text-sm hover:!shadow-lg hover:!shadow-[#FFD700]/30 !transition-all" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <WalletMultiButton className="!bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-semibold !rounded-full !px-4 !py-2 !text-xs" />
            <button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5 bg-[#07070A]/95 backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
