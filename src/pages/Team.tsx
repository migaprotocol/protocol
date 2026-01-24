import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ExternalLink, Twitter, Globe } from 'lucide-react';

const team = [
  {
    name: 'Cyrus Pahlavi',
    role: 'Advisor',
    image: '/images/cyrus-pahlavi.png',
    bio: 'Advocate for freedom and democracy. Continuing the legacy of Cyrus the Great.',
    links: {
      twitter: 'https://x.com/PahsaCyrus',
      website: 'https://cyrus.foundation',
    },
  },
];

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight mb-4">
              The <span className="text-gold">Team</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Building the future of decentralized finance for a free Iran.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {team.map((member) => (
              <div
                key={member.name}
                className="card rounded-xl p-6 text-center hover:border-gold/30 transition-colors"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gold/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/migacoin.png';
                    }}
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-gold text-sm mb-3">{member.role}</p>
                <p className="text-white/50 text-sm mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-3">
                  {member.links.twitter && (
                    <a
                      href={member.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Twitter size={18} className="text-white/60" />
                    </a>
                  )}
                  {member.links.website && (
                    <a
                      href={member.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Globe size={18} className="text-white/60" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Join Us */}
          <section className="text-center">
            <div className="card rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-medium mb-4">Join the Movement</h3>
              <p className="text-white/50 mb-6">
                MIGA is a community-driven protocol. Get involved by joining our Discord,
                contributing code, or participating in governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://discord.gg/miga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-full hover:bg-gold/90 transition-colors"
                >
                  Join Discord
                </a>
                <a
                  href="https://github.com/migaprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                >
                  <ExternalLink size={18} />
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
