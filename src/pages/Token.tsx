import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';

export default function Token() {
  const [copied, setCopied] = useState(false);
  const tokenAddress = "MIGA_TOKEN_ADDRESS_HERE"; // Replace with actual address

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-medium mb-10 tracking-tight">
            <span className="gradient-text">$MIGA</span> Token
          </h1>

          <div className="space-y-6">
            {/* Contract Address */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-zinc-300">Contract Address</h2>
              <div className="flex items-center gap-2 bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                <code className="flex-1 text-sm text-gold font-mono break-all">{tokenAddress}</code>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-zinc-800 rounded transition-colors"
                >
                  {copied ? <Check size={18} className="text-gold" /> : <Copy size={18} className="text-zinc-500" />}
                </button>
              </div>
            </div>

            {/* Token Info */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-zinc-300">Token Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">Name</span>
                  <span className="font-medium text-sm">MIGA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">Symbol</span>
                  <span className="font-medium text-sm">MIGA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">Decimals</span>
                  <span className="font-medium font-mono text-sm">9</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">Total Supply</span>
                  <span className="font-medium font-mono text-sm">1,000,000,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-500 text-sm">Network</span>
                  <span className="font-medium text-sm">Solana</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 text-sm">Standard</span>
                  <span className="font-medium text-sm">SPL Token</span>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-zinc-300">Token Distribution</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gold" style={{ width: '10%' }} />
                  </div>
                  <span className="text-xs whitespace-nowrap text-zinc-400 font-mono">10% LP</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gold/70" style={{ width: '40%' }} />
                  </div>
                  <span className="text-xs whitespace-nowrap text-zinc-400 font-mono">40% Sale</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gold/50" style={{ width: '50%' }} />
                  </div>
                  <span className="text-xs whitespace-nowrap text-zinc-400 font-mono">50% Treasury</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-zinc-300">Links</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="https://solscan.io/token/MIGA_ADDRESS"
                  className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 hover:border-gold/30 border border-transparent transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Solscan</span>
                  <ExternalLink size={16} className="text-zinc-500" />
                </a>
                <a
                  href="https://birdeye.so/token/MIGA_ADDRESS"
                  className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 hover:border-gold/30 border border-transparent transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Birdeye</span>
                  <ExternalLink size={16} className="text-zinc-500" />
                </a>
                <a
                  href="https://app.meteora.ag/pools/MIGA_POOL"
                  className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 hover:border-gold/30 border border-transparent transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Meteora Pool</span>
                  <ExternalLink size={16} className="text-zinc-500" />
                </a>
                <a
                  href="https://jup.ag/swap/SOL-MIGA"
                  className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 hover:border-gold/30 border border-transparent transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Jupiter</span>
                  <ExternalLink size={16} className="text-zinc-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
