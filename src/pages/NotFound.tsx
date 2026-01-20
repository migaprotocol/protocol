import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-7xl font-medium gradient-text mb-4">404</h1>
          <p className="text-lg text-zinc-400 mb-8">Page not found</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold hover:bg-gold-600 text-black px-6 py-3 rounded-lg font-medium transition-all"
          >
            Go Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
