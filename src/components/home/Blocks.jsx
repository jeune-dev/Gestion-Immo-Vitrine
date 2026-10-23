import { useId, useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { faq, site } from '@/content/site';
import { images } from '@/content/images';
import { Button, Container, Display, Eyebrow, Reveal, Section, SectionTitle } from '@/components/common/ui';

export function Faq({ items = faq, tone = 'creme' }) {
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionTitle align="left" eyebrow="Questions fréquentes" title="Tout savoir" accent="avant de commencer." text="Une autre question ? Écrivez-nous, nous répondons rapidement." />
        <div className="divide-y divide-bordure border-y border-bordure">
          {items.map((it) => <FaqItem key={it.q} {...it} />)}
        </div>
      </div>
    </Section>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div>
      <h3>
        <button
          type="button"
          className="font-display flex w-full items-center justify-between gap-6 py-6 text-left text-lg text-texte hover:text-primaire"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          {q}
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-bordure-forte">
            {open ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
          </span>
        </button>
      </h3>
      <div id={id} hidden={!open} className="pr-14 pb-6 leading-relaxed text-texte-secondaire">{a}</div>
    </div>
  );
}

/** Appel à l'action final, sur photo de Dakar. */
export function CtaBand({
  title = 'Beaucoup de propriétaires y pensent.',
  accent = 'Vous, faites le premier pas.',
  text = 'Présentez-nous votre parc : nous vous accompagnons pour démarrer et inviter vos premiers locataires.',
  image = images.dakar,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-nuit">
      <img src={image.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="site-voile-plein absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="py-24 text-center sm:py-32">
        <Reveal>
          <Display title={title} accent={accent} light className="mx-auto max-w-3xl" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">{text}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/contact?sujet=acces" variant="secondaire" size="lg">Demander un accès<ArrowRight className="size-4" aria-hidden="true" /></Button>
            <Button to="/tarifs" variant="clair" size="lg">Voir les tarifs</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Masquée tant qu'aucun témoignage réel n'est renseigné dans `site.js`. */
export function Testimonials() {
  if (!site.testimonials.length) return null;
  return (
    <Section tone="surface">
      <SectionTitle eyebrow="Ils nous font confiance" title="Ce qu'en disent" accent="nos propriétaires." />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {site.testimonials.map((t) => (
          <figure key={t.name} className="rounded-carte border border-bordure bg-surface p-8">
            <blockquote className="font-display text-lg leading-relaxed font-light text-texte">« {t.quote} »</blockquote>
            <figcaption className="mt-6 text-sm"><span className="font-semibold text-texte">{t.name}</span><span className="text-texte-secondaire"> · {t.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/** Bandeau photo des pages intérieures, sous l'en-tête transparent. */
export function PageHero({ eyebrow, title, accent, text, image = images.facade, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-nuit">
      <img src={image.src} alt="" decoding="async" fetchPriority="high" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="site-voile absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="pt-40 pb-20 sm:pt-48 sm:pb-28">
        <Reveal className="max-w-3xl">
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <Display as="h1" title={title} accent={accent} light className="mt-5 lg:text-[3.6rem]" />
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/80">{text}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
