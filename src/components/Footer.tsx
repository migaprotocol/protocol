import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="MIGA" className="h-8 w-8" />
            <span className="text-xl font-medium gradient-text">MIGA</span>
            <span className="text-zinc-600 text-sm uppercase tracking-widest">Protocol</span>
          </div>

          <div className="flex gap-8 text-sm text-zinc-500">
            <Link to="/docs" className="hover:text-gold transition-colors">Docs</Link>
            <a href="https://miga.us.org" className="hover:text-gold transition-colors">DAO</a>
            <a href="https://github.com/miga-protocol" className="hover:text-gold transition-colors">GitHub</a>
            <a href="https://twitter.com/migaprotocol" className="hover:text-gold transition-colors">Twitter</a>
          </div>

          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} MIGA Protocol
          </p>
        </div>
      </div>
    </footer>
  );
}
