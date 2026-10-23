import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { site } from '@/content/site';
import { Header } from './Header';
import { Footer } from './Footer';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Raccourcis de contact flottants (affichés seulement si les coordonnées existent). */
function FloatingActions() {
  const wa = site.contact.whatsappUrl('Bonjour, je souhaite en savoir plus sur la plateforme.');
  const { phone } = site.contact;
  if (!wa && !phone) return null;
  const cls = 'grid size-12 place-items-center rounded-full bg-nuit/85 text-white shadow-flottant ring-1 ring-white/20 backdrop-blur-md transition-transform hover:scale-105';
  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Nous écrire sur WhatsApp"><MessageCircle className="size-5" aria-hidden="true" /></a>}
      {phone && <a href={`tel:${phone}`} className={cls} aria-label="Nous appeler"><Phone className="size-5" aria-hidden="true" /></a>}
    </div>
  );
}

const PageFallback = () => (
  <div className="grid min-h-dvh place-items-center bg-nuit" role="status" aria-label="Chargement">
    <span className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-secondaire" />
  </div>
);

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-fond">
      <ScrollToTop />
      <Header />
      <main id="contenu" className="flex-1">
        <Suspense fallback={<PageFallback />}><Outlet /></Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
