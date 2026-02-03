import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MigaCalculator } from '@/components/MigaCalculator'

export default function Calculator() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07070A]">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <MigaCalculator />
      </main>
      <Footer />
    </div>
  )
}
