import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="MIGA" className="h-10 w-10" />
            <span className="text-2xl font-bold gradient-text">MIGA</span>
            <span className="text-xs text-slate-400 hidden sm:block">Protocol</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/token" className="text-gray-300 hover:text-white transition">Token</Link>
            <Link to="/docs" className="text-gray-300 hover:text-white transition">Docs</Link>
            <a href="https://miga.us.org" className="text-gray-300 hover:text-white transition">DAO</a>
            <WalletMultiButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <WalletMultiButton />
            <button
              className="text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col gap-4">
              <Link to="/token" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Token</Link>
              <Link to="/docs" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Docs</Link>
              <a href="https://miga.us.org" className="text-gray-300 hover:text-white">DAO</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
