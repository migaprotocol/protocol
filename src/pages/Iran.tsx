import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Globe, Mountain, Users, Utensils, Palette, Building2, Heart, Sun } from 'lucide-react'

export default function Iran() {
  return (
    <div className="min-h-screen bg-[#07070A]">
      {/* Persian-themed background elements */}
      <div className="persian-bg" />
      <div className="persian-stars" />
      <div className="persian-glow" />

      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section with Video */}
        <section className="container-xl mb-16">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient-ember">Iran</span>
              <span className="text-[#EDEDF2] block mt-2">The Land of Unexpected Wonders</span>
            </h1>
            <p className="text-lg text-[#9999A5] leading-relaxed">
              Iran, the former great Persian Empire, is probably among the most misunderstood
              countries of our time. This is in itself a very good reason to come and experience
              a unique and unforgettable journey on its lands.
            </p>
          </div>

          {/* YouTube Video Embed */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/ZXvjKn1Fst8"
                title="Mio Iran - A Journey Through the Land of Unexpected Wonders"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-center mt-4 text-sm text-[#6B6B7B]">
              "Mio Iran" by Sebastian Linda — A tourist from Germany shares the experience of
              travelling to Iran, the land of unexpected wonders.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="container-xl mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="prose-custom">
              <p className="text-lg text-[#B8B8C6] leading-relaxed mb-6">
                Most visitors who experienced Iran agree that they lived an experience beyond expectations!
                Because Iran is simply nothing as you can expect and moreover nothing like what Western media
                and politics depict. So, here is a bite of what Iran truly is!
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Persian Empire */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">In the Footsteps of the Persian Empire</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                Iran is the land of great history, the cradle of one of the world's oldest civilizations
                and the homeland to the powerful dynasties of the glorious Persian Empire. Thus, visiting
                Iran is entering millions of years of history.
              </p>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                This legacy remains alive on the World Heritage Sites of Persepolis, Golestan Palace,
                Bam citadel, and many other historical places all over the country. Indeed, Iran doesn't
                have fewer than <span className="text-amber-400 font-semibold">26 sites listed by UNESCO!</span>
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                History is the cement of the Persian culture. Nowadays' culture is deeply rooted in the
                traditions of Zoroastrianism, one of the world's oldest religions, later influenced by
                Islam and its mystic branch, Sufism, which has inspired many famous Persian poets,
                from Rumi to Hafez.
              </p>
            </div>

            {/* Hospitality */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">The Friendliest People on Earth</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                It's this remarkable combination of origins that has given Iranian people their main
                characteristics, among which there is an <span className="text-rose-400">unrivalled sense of hospitality</span>.
              </p>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                No visitor has ever come to Iran without falling in love with these warm-hearted people,
                amazed by the way Iranians greet their visitors. Iran is a land where you can discover
                the true meaning of the word "hospitality".
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                Iranians are always so keen to help, start chatting, share tea or even invite you over
                for a homemade family dinner. There is no doubt that your many encounters will create
                the most striking and sweet memories of your trip.
              </p>
            </div>

            {/* Architecture */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">Beauty of Islamic Architecture</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                Thinking about Iran immediately brings to mind the image of the masterpieces of
                Isfahan's blue-domed mosques, embellished with the most beautiful tile work knowledge,
                and whose golden minarets stand proudly at the horizon.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                Iran presents some of the best examples of Islamic architecture in the world, but not
                only. Christian, Jewish, Zoroastrian, and Babylonian influences have left striking
                monuments as their heritage. The great empires of Persia have also granted their land
                with architectural treasures, from the grandeur of Persepolis to the refinement of
                Qajar houses.
              </p>
            </div>

            {/* Nature */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">A Land of Four Seasons</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                The magic lies in Iran's astonishing nature and landscapes. The fantastic sight of sand
                dunes spreading at the horizon is one of the most famous images associated with the country.
                It has many beautiful deserts, from the flawless Maranjab to the otherworldly sand formations
                of the <span className="text-emerald-400">Dasht-e-Lut, the hottest spot on earth</span>.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                However, Iran is so much more than a desert! The Alborz and Zagros Mountains are paradises
                for climbers and skiers. From the humid Hyrcanian forests near the Caspian Sea to the
                mangroves of the Persian Gulf, Iran is a kaleidoscope of natural wonders.
              </p>
            </div>

            {/* Arts & Crafts */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">Ancestral Traditions of Finest Arts</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                Through centuries, nature and life have been muses for craftspeople who developed some
                of the best handicrafts in the world. Walking in Shiraz or Isfahan's Bazaars gives a
                hint of the diversity and grace of Persian arts.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                The greatest ambassadors are the <span className="text-purple-400">Persian carpets</span>:
                recognized worldwide for their quality and the beauty of their designs. In Iran, carpets
                aren't just furniture—it's truly an art passed over generations. So are the ancestral
                techniques of woodcarving, glasswork, embroidery, marquetry and dozens of other traditional
                handicrafts.
              </p>
            </div>

            {/* Food */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">Delights of Persian Foods</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                It would be impossible to talk about Iran without mentioning its food. Once again,
                Persian cuisine is nothing like you can imagine. Iranian dishes are delicate,
                sophisticated, colourful and delightful.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                From roasted eggplants to pomegranate stew, saffron rice, and meat Kebab, the variety
                of its traditional dishes is endless. UNESCO has even given recognition to
                <span className="text-orange-400"> Rasht</span>, the capital city of Gilan Province,
                for its exceptional traditional gastronomy—a combination of ancient recipes and techniques.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Section */}
        <section className="container-xl mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-10 rounded-2xl">
              <Sun className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#EDEDF2] mb-6">Experience the Journey Yourself</h2>
              <p className="text-lg text-[#9999A5] leading-relaxed mb-8">
                Iran is a land of contrasts and diversity; a modern country with a vibrant history;
                and a colourful combination of ethnicities with their traditions, cultures, and languages.
                Words can only fail to describe the wonders it has to offer to the curious and open-minded
                visitor. The only way is to experience this enchanting journey by yourself.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://dao.miga.network/fund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-btn"
                >
                  Support the Movement
                </a>
                <a href="/docs" className="hero-btn-outline">
                  Learn About MIGA
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
