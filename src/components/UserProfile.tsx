import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  User,
  Copy,
  Check,
  ExternalLink,
  Twitter,
  Globe,
  MessageCircle,
  Shield,
  Fingerprint,
  ChevronDown,
  ChevronUp,
  Wallet
} from 'lucide-react';

// Types for profile data
interface SocialLinks {
  twitter?: string;
  farcaster?: string;
  telegram?: string;
  website?: string;
  github?: string;
}

interface UserDID {
  method: string;      // e.g., 'pars', 'hanzo', 'sparkle'
  handle: string;      // e.g., 'azadi.pars'
  chainId: number;
  verified: boolean;
}

interface UserProfileData {
  address: string;
  displayName?: string;      // ENS/SNS name
  avatar?: string;
  dids: UserDID[];
  socials: SocialLinks;
  isLoading: boolean;
}

// Shorten address for display
function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Mock ENS/SNS resolver (in production, use actual resolver)
async function resolveNameService(address: string): Promise<{ name?: string; avatar?: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock responses for demo
  const mockNames: Record<string, { name: string; avatar?: string }> = {
    // Add known addresses here
  };

  return mockNames[address] || {};
}

// Mock DID lookup
async function lookupDIDs(address: string): Promise<UserDID[]> {
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return empty for now - in production, query identity contracts
  return [];
}

// Mock social links lookup from ENS text records
async function lookupSocialLinks(address: string): Promise<SocialLinks> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return {};
}

export function UserProfile() {
  const { publicKey, connected, disconnect } = useWallet();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load profile data when wallet connects
  useEffect(() => {
    if (!connected || !publicKey) {
      setProfile(null);
      return;
    }

    const address = publicKey.toBase58();

    setProfile({
      address,
      dids: [],
      socials: {},
      isLoading: true,
    });

    // Load all profile data in parallel
    Promise.all([
      resolveNameService(address),
      lookupDIDs(address),
      lookupSocialLinks(address),
    ]).then(([nameData, dids, socials]) => {
      setProfile(prev => prev ? {
        ...prev,
        displayName: nameData.name,
        avatar: nameData.avatar,
        dids,
        socials,
        isLoading: false,
      } : null);
    });
  }, [connected, publicKey]);

  const copyAddress = useCallback(async () => {
    if (!profile?.address) return;
    await navigator.clipboard.writeText(profile.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [profile?.address]);

  // Not connected - show connect button
  if (!connected) {
    return (
      <div className="inline-flex">
        <WalletMultiButton className="!bg-gradient-to-r !from-amber-500 !to-orange-500 hover:!from-amber-600 hover:!to-orange-600 !rounded-lg !h-10 !text-sm !font-medium" />
      </div>
    );
  }

  // Loading state
  if (!profile || profile.isLoading) {
    return (
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-3 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-700" />
          <div className="flex-1">
            <div className="h-4 bg-neutral-700 rounded w-24 mb-2" />
            <div className="h-3 bg-neutral-700 rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden">
      {/* Compact header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center gap-3 hover:bg-neutral-800/50 transition-colors"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
          {profile.avatar ? (
            <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-amber-400" />
          )}
        </div>

        {/* Name/Address */}
        <div className="flex-1 text-left min-w-0">
          <div className="font-medium text-sm truncate">
            {profile.displayName || shortenAddress(profile.address)}
          </div>
          {profile.displayName && (
            <div className="text-xs text-neutral-400 truncate">
              {shortenAddress(profile.address)}
            </div>
          )}
        </div>

        {/* Expand/collapse */}
        <div className="flex items-center gap-2">
          {profile.dids.length > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-400">
              <Fingerprint className="w-3 h-3" />
              {profile.dids.length}
            </div>
          )}
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-neutral-800 p-4 space-y-4">
          {/* Address with copy */}
          <div>
            <div className="text-xs text-neutral-400 mb-1">Wallet Address</div>
            <div className="flex items-center gap-2 bg-neutral-800/50 rounded-lg p-2">
              <Wallet className="w-4 h-4 text-neutral-500" />
              <code className="text-xs text-neutral-300 font-mono flex-1 truncate">
                {profile.address}
              </code>
              <button
                onClick={copyAddress}
                className="p-1.5 hover:bg-neutral-700 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                )}
              </button>
              <a
                href={`https://solscan.io/account/${profile.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-neutral-700 rounded transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* DIDs */}
          {profile.dids.length > 0 && (
            <div>
              <div className="text-xs text-neutral-400 mb-2">Decentralized Identities</div>
              <div className="space-y-2">
                {profile.dids.map((did, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-neutral-800/50 rounded-lg p-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Shield className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        did:{did.method}:{did.handle}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Chain {did.chainId}
                        {did.verified && <span className="text-emerald-400 ml-2">Verified</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No DIDs - prompt to create */}
          {profile.dids.length === 0 && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Fingerprint className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-amber-200">No DID found</div>
                  <p className="text-xs text-amber-200/70 mt-1">
                    Create your decentralized identity on Pars, Hanzo, or Zoo network.
                  </p>
                  <a
                    href="/identity"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-2"
                  >
                    Mint Identity <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {Object.keys(profile.socials).length > 0 && (
            <div>
              <div className="text-xs text-neutral-400 mb-2">Social Links</div>
              <div className="flex flex-wrap gap-2">
                {profile.socials.twitter && (
                  <a
                    href={`https://x.com/${profile.socials.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    @{profile.socials.twitter}
                  </a>
                )}
                {profile.socials.farcaster && (
                  <a
                    href={`https://warpcast.com/${profile.socials.farcaster}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-purple-400" />
                    {profile.socials.farcaster}
                  </a>
                )}
                {profile.socials.telegram && (
                  <a
                    href={`https://t.me/${profile.socials.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                    @{profile.socials.telegram}
                  </a>
                )}
                {profile.socials.website && (
                  <a
                    href={profile.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Website
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Disconnect button */}
          <button
            onClick={disconnect}
            className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-lg transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
}

// Compact version for header
export function UserProfileCompact() {
  const { publicKey, connected } = useWallet();

  if (!connected || !publicKey) {
    return (
      <WalletMultiButton className="!bg-gradient-to-r !from-amber-500 !to-orange-500 hover:!from-amber-600 hover:!to-orange-600 !rounded-lg !h-9 !text-xs !font-medium !px-3" />
    );
  }

  return (
    <div className="flex items-center gap-2 bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-1.5">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
        <User className="w-3 h-3 text-amber-400" />
      </div>
      <span className="text-xs font-medium text-neutral-300">
        {shortenAddress(publicKey.toBase58())}
      </span>
    </div>
  );
}

export default UserProfile;
