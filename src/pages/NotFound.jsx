import { ArrowLeft } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { images } from '@/content/images';
import { Button, Container, Display } from '@/components/common/ui';

export default function NotFound() {
  useSeo('Page introuvable');
  return (
    <section className="relative isolate overflow-hidden bg-nuit text-white">
      <img src={images.goree.src} alt="" decoding="async" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="site-voile-plein absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="flex min-h-[85svh] flex-col items-center justify-center pt-32 pb-20 text-center">
        <p className="font-display text-8xl font-light text-secondaire">404</p>
        <Display as="h1" title="Cette page" accent="n'existe pas." light className="mt-6" />
        <p className="mt-5 max-w-md text-lg text-white/75">Le lien est peut-être incorrect ou la page a été déplacée.</p>
        <Button to="/" variant="blanc" size="lg" className="mt-10"><ArrowLeft className="size-4" aria-hidden="true" />Retour à l'accueil</Button>
      </Container>
    </section>
  );
}
