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

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl font-medium mb-10 tracking-tight">
            <span className="text-gold">$MIGA</span> Token
          </h1>

          <div className="space-y-6">
            {/* Contract Address */}
            <div className="card rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-white/80">Contract Address</h2>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 border border-white/10">
                <code className="flex-1 text-sm text-gold font-mono break-all">{tokenAddress}</code>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  {copied ? <Check size={18} className="text-gold" /> : <Copy size={18} className="text-white/40" />}
                </button>
              </div>
            </div>

            {/* Token Info */}
            <div className="card rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-white/80">Token Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 text-sm">Name</span>
                  <span className="font-medium text-sm">MIGA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 text-sm">Symbol</span>
                  <span className="font-medium text-sm">MIGA</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 text-sm">Decimals</span>
                  <span className="font-medium font-mono text-sm">9</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 text-sm">Total Supply</span>
                  <span className="font-medium font-mono text-sm text-gold">1,000,000,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 text-sm">Network</span>
                  <span className="font-medium text-sm">Solana</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-white/40 text-sm">Standard</span>
                  <span className="font-medium text-sm">SPL Token</span>
                </div>
              </div>
            </div>

            {/* Distribution */}
            <div className="card rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-white/80">Token Distribution</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full bg-[#C9A227]/60" style={{ width: '10%' }} />
                  </div>
                  <span className="text-xs whitespace-nowrap text-white/50 font-mono w-24">10% LP</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full bg-[#C9A227]" style={{ width: '40%' }} />
                  </div>
                  <span className="text-xs whitespace-nowrap text-white/50 font-mono w-24">40% Sale</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <div className="h-full bg-[#F4D03F]" style={{ width: '50%' }} />
                  </div>
                  <span className="text-xs whitespace-nowrap text-white/50 font-mono w-24">50% Treasury</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="card rounded-xl p-6">
              <h2 className="text-base font-medium mb-4 text-white/80">Links</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="https://solscan.io/token/MIGA_ADDRESS"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#C9A227]/30 transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Solscan</span>
                  <ExternalLink size={16} className="text-white/30" />
                </a>
                <a
                  href="https://birdeye.so/token/MIGA_ADDRESS"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#C9A227]/30 transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Birdeye</span>
                  <ExternalLink size={16} className="text-white/30" />
                </a>
                <a
                  href="https://app.meteora.ag/pools/MIGA_POOL"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#C9A227]/30 transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Meteora Pool</span>
                  <ExternalLink size={16} className="text-white/30" />
                </a>
                <a
                  href="https://jup.ag/swap/SOL-MIGA"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#C9A227]/30 transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Jupiter</span>
                  <ExternalLink size={16} className="text-white/30" />
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
