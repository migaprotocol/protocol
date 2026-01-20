import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-8">Page not found</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Go Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
