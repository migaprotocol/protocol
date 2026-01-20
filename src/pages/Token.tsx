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
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8">
            <span className="gradient-text">$MIGA</span> Token
          </h1>

          <div className="space-y-8">
            {/* Contract Address */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Contract Address</h2>
              <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-3">
                <code className="flex-1 text-sm text-emerald-400 break-all">{tokenAddress}</code>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-slate-700 rounded transition"
                >
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Token Info */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Token Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Name</span>
                  <span className="font-semibold">MIGA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Symbol</span>
                  <span className="font-semibold">MIGA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Decimals</span>
                  <span className="font-semibold">9</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="font-semibold">1,000,000,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-gray-400">Network</span>
                  <span className="font-semibold">Solana</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Standard</span>
                  <span className="font-semibold">SPL Token</span>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Token Distribution</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '10%' }} />
                  </div>
                  <span className="text-sm whitespace-nowrap">10% LP</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: '40%' }} />
                  </div>
                  <span className="text-sm whitespace-nowrap">40% Sale</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '50%' }} />
                  </div>
                  <span className="text-sm whitespace-nowrap">50% Treasury</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Links</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="https://solscan.io/token/MIGA_ADDRESS"
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Solscan</span>
                  <ExternalLink size={18} />
                </a>
                <a
                  href="https://birdeye.so/token/MIGA_ADDRESS"
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Birdeye</span>
                  <ExternalLink size={18} />
                </a>
                <a
                  href="https://app.meteora.ag/pools/MIGA_POOL"
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Meteora Pool</span>
                  <ExternalLink size={18} />
                </a>
                <a
                  href="https://jup.ag/swap/SOL-MIGA"
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Jupiter</span>
                  <ExternalLink size={18} />
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
