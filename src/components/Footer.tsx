import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/favicon.svg" alt="MIGA" className="w-10 h-10" />
              <span className="text-lg font-medium">MIGA</span>
            </div>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed">
              A token powering a diaspora-led civic operating system for the Persian community worldwide.
            </p>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-4">Protocol</h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/40">
              <Link to="/token" className="hover:text-white transition-colors">Token</Link>
              <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
              <a href="https://github.com/miga-protocol" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-4">Community</h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/40">
              <a href="https://miga.us.org" className="hover:text-white transition-colors">DAO</a>
              <a href="https://discord.gg/miga" className="hover:text-white transition-colors">Discord</a>
              <a href="https://twitter.com/migaprotocol" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} MIGA Protocol. Building in code what tyrants cannot burn.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="https://realms.today/dao/miga" className="hover:text-white transition-colors">Governance</a>
            <a href="https://app.meteora.ag" className="hover:text-white transition-colors">Trade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
