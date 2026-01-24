import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ExternalLink, Twitter, Globe, Linkedin, Instagram } from 'lucide-react';

const team = [
  {
    name: 'Cyrus Pahlavi',
    role: 'Founding Chair',
    image: '/images/cyrus-pahlavi.png',
    bio: 'Leading with a vision of uniting the Persian diaspora and preserving our cultural heritage for future generations.',
    links: {
      twitter: 'https://x.com/PahsaCyrus',
      website: 'https://www.cyruspahlavi.com/about',
      linkedin: 'https://www.linkedin.com/in/cyruspahlavi',
      instagram: 'https://www.instagram.com/cyruspahlavi',
    },
  },
  {
    name: 'Kamran Pahlavi',
    role: 'Board Member',
    image: '/images/kamran-pahlavi.png',
    bio: 'Dedicated to advancing Persian cultural initiatives and supporting the global Iranian community through strategic leadership.',
    links: {
      instagram: 'https://www.instagram.com/kamranpahlavi',
    },
  },
  {
    name: 'Dara Gallopin',
    role: 'Creative Officer',
    image: '/images/dara-gallopin.png',
    bio: 'Bringing creative vision to ensure our message resonates with Persians worldwide through compelling storytelling and design.',
    links: {
      website: 'https://www.daragallopin.com/',
      linkedin: 'https://www.linkedin.com/in/daragallopin',
      instagram: 'https://www.instagram.com/daragallopin',
    },
  },
];

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-widest uppercase">Founding Team</span>
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight mt-2 mb-4">
              Leadership
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              MIGA Protocol is guided by dedicated individuals committed to the preservation
              of Persian heritage and the empowerment of the global diaspora.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {team.map((member) => (
              <div
                key={member.name}
                className="card rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-black text-4xl font-bold ${member.image ? 'hidden' : ''}`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-white">{member.name}</h3>
                  <p className="text-gold font-medium mb-3">{member.role}</p>
                  <p className="text-white/50 text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    {member.links.twitter && (
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-gold transition-colors"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.links.website && (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-gold transition-colors"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-gold transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.links.instagram && (
                      <a
                        href={member.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-gold transition-colors"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Governance Note */}
          <section className="mb-16">
            <div className="card rounded-xl p-8 text-center">
              <p className="text-white/60 italic">
                "Public Stewardship: The founding board, led by members of the Pahlavi family,
                will guide MIGA through its first two years. A planned transition to full public
                governance will follow, ensuring the community ultimately controls its own destiny."
              </p>
            </div>
          </section>

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
