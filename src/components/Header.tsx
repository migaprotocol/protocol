import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A227] to-[#8B7355] flex items-center justify-center">
              <span className="text-black font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-medium tracking-tight">MIGA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/token" className="nav-link text-sm">Token</Link>
            <Link to="/docs" className="nav-link text-sm">Docs</Link>
            <a href="https://miga.us.org" className="nav-link text-sm">DAO</a>
            <a href="https://github.com/miga-protocol" className="nav-link text-sm">GitHub</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <WalletMultiButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <WalletMultiButton />
            <button
              className="p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-3">
              <Link to="/token" className="nav-link text-sm py-2" onClick={() => setIsOpen(false)}>Token</Link>
              <Link to="/docs" className="nav-link text-sm py-2" onClick={() => setIsOpen(false)}>Docs</Link>
              <a href="https://miga.us.org" className="nav-link text-sm py-2">DAO</a>
              <a href="https://github.com/miga-protocol" className="nav-link text-sm py-2">GitHub</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
