import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center px-6">
          <h1 className="text-8xl font-medium text-gold mb-4">404</h1>
          <p className="text-lg text-white/50 mb-8">Page not found</p>
          <Link to="/" className="btn-primary inline-block">
            Go Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
