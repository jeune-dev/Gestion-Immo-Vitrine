import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { features } from '@/content/features';
import { images } from '@/content/images';
import { useSeo } from '@/hooks/useSeo';
import { cx } from '@/utils/format';
import { Container, Reveal } from '@/components/common/ui';
import { CtaBand, PageHero } from '@/components/home/Blocks';

/** Module visible à l'écran, pour surligner le sommaire. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const ids = features.map((f) => f.id);

export default function Features() {
  useSeo('Fonctionnalités', 'Immeubles, locataires, baux, échéances, paiement Wave et Orange Money, relances WhatsApp, quittances, cautions, travaux et états des lieux.');
  const active = useActiveSection(ids);
  return (
    <>
      <PageHero image={images.tourBlanche} eyebrow="Fonctionnalités" title="Chaque étape de la location," accent="couverte." text={`${features.length} modules qui travaillent ensemble, de la création de vos biens à la quittance de fin de mois.`} />

      <Container className="grid gap-12 py-[clamp(4rem,3rem+4vw,7rem)] lg:grid-cols-12">
        <nav aria-label="Sommaire des modules" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-32 space-y-1 border-l border-bordure">
            {features.map((f, i) => (
              <li key={f.id}>
                <a
                  href={`#${f.id}`}
                  aria-current={active === f.id ? 'true' : undefined}
                  className={cx(
                    '-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-200',
                    active === f.id ? 'border-primaire font-medium text-texte' : 'border-transparent text-texte-secondaire hover:text-texte',
                  )}
                >
                  <span className="w-5 text-texte-discret tabular-nums">{String(i + 1).padStart(2, '0')}</span>{f.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="lg:col-span-8 lg:col-start-5">
          {features.map((f, i) => (
            <Reveal key={f.id}>
              <section id={f.id} aria-labelledby={`t-${f.id}`} className="grid gap-6 border-t border-bordure py-12 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_1fr]">
                <div className="flex items-center gap-3 sm:block">
                  <f.icon className="size-6 text-primaire" aria-hidden="true" strokeWidth={1.6} />
                  <span className="font-display text-sm text-texte-discret sm:mt-3 sm:block">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <h2 id={`t-${f.id}`} className="t-display text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] text-texte">{f.title}</h2>
                  <p className="t-chapo mt-4 max-w-2xl text-texte-secondaire">{f.text}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-texte"><Check className="mt-1 size-4 shrink-0 text-succes" aria-hidden="true" />{p}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
