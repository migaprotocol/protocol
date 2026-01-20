import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="MIGA" className="h-8 w-8" />
            <span className="text-xl font-bold gradient-text">MIGA</span>
            <span className="text-slate-400">Protocol</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <Link to="/docs" className="hover:text-white">Docs</Link>
            <a href="https://miga.us.org" className="hover:text-white">DAO</a>
            <a href="https://github.com/miga-protocol" className="hover:text-white">GitHub</a>
            <a href="https://twitter.com/migaprotocol" className="hover:text-white">Twitter</a>
          </div>

          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} MIGA Protocol
          </p>
        </div>
      </div>
    </footer>
  );
}
