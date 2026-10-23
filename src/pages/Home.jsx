import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { features } from '@/content/features';
import { images } from '@/content/images';
import { useSeo } from '@/hooks/useSeo';
import { Button, Container, Display, Eyebrow, Photo, Reveal, Section, SectionTitle } from '@/components/common/ui';
import { DashboardMockup, PhoneMockup } from '@/components/home/Mockups';
import { CtaBand, Faq, Testimonials } from '@/components/home/Blocks';
import { PlanGrid } from '@/components/pricing/Plans';

export default function Home() {
  useSeo(null, 'Encaissez vos loyers par Wave et Orange Money, relancez vos locataires sur WhatsApp et envoyez les quittances automatiquement.');
  return (
    <>
      <Hero />
      <BeforeAfter />
      <Owners />
      <Tenants />
      <ModulesIndex />
      <Steps />
      <Distance />
      <Section id="tarifs" tone="surface">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Tarifs" title="Un abonnement clair," accent="à la taille de votre parc." />
          <Link to="/tarifs" className="lien inline-flex items-center gap-1.5 self-start pb-1 font-semibold text-primaire md:self-auto">Comparer les plans<ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <div className="mt-14"><PlanGrid compact /></div>
      </Section>
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}

/* ── Hero : photo plein écran, une promesse, deux actions, trois faits ─────────── */

const facts = [
  ['Wave & Orange Money', 'Vos locataires paient depuis leur téléphone.'],
  ['Relances WhatsApp', 'Les rappels partent seuls, avant et après l\'échéance.'],
  ['Quittance PDF', 'Produite à chaque paiement confirmé.'],
];

function Hero() {
  const reduce = useReducedMotion();
  const enter = (d) => (reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } });
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-nuit text-white">
      <motion.img
        src={images.heroTour.src} alt="" fetchPriority="high" decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover object-[70%_center]"
        {...(reduce ? {} : { initial: { scale: 1.06 }, animate: { scale: 1 }, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } })}
      />
      <div className="site-voile absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="flex flex-1 flex-col justify-center pt-36 pb-14">
        <motion.div {...enter(0.05)} className="max-w-[44rem]">
          <Eyebrow light>Gestion locative au Sénégal</Eyebrow>
          <h1 className="t-hero mt-6 text-balance">
            Vos loyers encaissés,
            <span className="block font-semibold italic">sans courir après personne.</span>
          </h1>
          <p className="t-chapo mt-7 max-w-[34rem] text-pretty text-white/80">
            Une seule plateforme pour suivre vos appartements, encaisser les loyers par mobile et envoyer les quittances — pendant que vos locataires gèrent tout depuis leur téléphone.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact?sujet=acces" variant="secondaire" size="lg">Demander un accès<ArrowRight className="size-4" aria-hidden="true" /></Button>
            <Button to="/fonctionnalites" variant="clair" size="lg">Voir les fonctionnalités</Button>
          </div>
        </motion.div>
      </Container>

      <motion.div {...enter(0.3)} className="border-t border-white/15">
        <Container>
          <dl className="grid divide-white/15 py-6 sm:grid-cols-3 sm:divide-x sm:py-8">
            {facts.map(([t, d]) => (
              <div key={t} className="py-2 sm:px-8 sm:py-0 sm:first:pl-0">
                <dt className="font-display text-[15px] font-semibold text-secondaire">{t}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/70">{d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </motion.div>
    </section>
  );
}

/* ── Avant / après : le problème concret, sans slogan ────────────────────────── */

const comparison = [
  ['Appeler chaque locataire pour réclamer le loyer', 'Un rappel WhatsApp part automatiquement'],
  ['Se déplacer pour récupérer des espèces', 'Paiement Wave ou Orange Money, rattaché à la bonne échéance'],
  ['Rédiger les reçus à la main', 'La quittance PDF est produite au paiement'],
  ['Tenir un cahier des loyers et des retards', 'Échéances à jour, retards visibles en un coup d\'œil'],
];

function BeforeAfter() {
  return (
    <Section tone="surface">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Display title="Chaque mois, vous relancez," accent="vous comptez, vous recopiez." />
          <p className="t-chapo mt-6 max-w-md text-texte-secondaire">La gestion locative prend des heures qui ne servent à rien. Voici ce qui change.</p>
          <Photo image={images.salon} className="mt-10 hidden aspect-[4/3] lg:block" sizes="40vw" />
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="hidden grid-cols-2 border-b border-bordure pb-4 text-xs font-semibold tracking-[0.14em] uppercase sm:grid">
            <p className="text-texte-discret">Aujourd'hui</p>
            <p className="pl-6 text-primaire">Avec Gestion Immobilière</p>
          </div>
          <ul className="border-t border-bordure sm:border-t-0">
            {comparison.map(([before, after]) => (
              <li key={before} className="grid gap-2 border-b border-bordure py-5 sm:grid-cols-2 sm:gap-0 sm:py-6">
                <p className="flex gap-3 text-sm text-texte-secondaire sm:pr-4 sm:text-base"><X className="mt-0.5 size-4 shrink-0 text-texte-discret sm:mt-1" aria-hidden="true" /><span><span className="sr-only">Aujourd'hui : </span>{before}</span></p>
                <p className="flex gap-3 font-medium text-texte sm:border-l sm:border-bordure sm:pl-6"><Check className="mt-1 size-4 shrink-0 text-succes" aria-hidden="true" /><span><span className="sr-only">Avec la plateforme : </span>{after}</span></p>
              </li>
            ))}
          </ul>
          <Button to="/proprietaires" variant="contour" className="mt-10">Ce que la plateforme fait pour vous<ArrowRight className="size-4" aria-hidden="true" /></Button>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Propriétaires : le tableau de bord en grand, annoté ─────────────────────── */

const notes = [
  ['Encaissements', 'Le total du mois et son évolution, immeuble par immeuble.'],
  ['Occupation', 'Les appartements libres, occupés ou en travaux.'],
  ['Retards', 'Les loyers impayés remontent d\'eux-mêmes.'],
  ['Échéances', 'Chaque locataire, son montant et son statut.'],
];

function Owners() {
  return (
    <Section tone="nuit">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <SectionTitle eyebrow="Pour les propriétaires" title="Tout votre parc," accent="sur un seul écran." light />
        <p className="t-chapo max-w-md text-white/70 lg:justify-self-end">Que vous ayez un appartement ou plusieurs immeubles, vous savez à tout moment où en sont vos loyers.</p>
      </div>
      <Reveal className="mt-14"><DashboardMockup /></Reveal>
      <ol className="mt-12 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {notes.map(([t, d], i) => (
          <Reveal as="li" key={t} delay={i * 0.05}>
            <p className="font-display text-sm text-secondaire">0{i + 1}</p>
            <p className="t-titre mt-2 text-white">{t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/65">{d}</p>
          </Reveal>
        ))}
      </ol>
      <Button to="/proprietaires" variant="clair" className="mt-12">Découvrir l'espace propriétaire<ArrowRight className="size-4" aria-hidden="true" /></Button>
    </Section>
  );
}

/* ── Locataires : photo et écran de paiement superposés ──────────────────────── */

function Tenants() {
  const points = ['Payer son loyer par Wave ou Orange Money', 'Recevoir sa quittance dès le paiement confirmé', 'Signaler un problème et suivre sa résolution', 'Retrouver son bail à tout moment'];
  return (
    <Section tone="creme">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
          <Photo image={images.locataire} className="aspect-[4/5] w-[82%]" sizes="(min-width: 1024px) 40vw, 80vw" />
          <div className="absolute right-0 bottom-10"><PhoneMockup className="origin-bottom-right scale-[0.88] sm:scale-100" /></div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <SectionTitle eyebrow="Pour les locataires" title="Payer son loyer," accent="comme on envoie un message." />
          <ul className="mt-8 divide-y divide-bordure border-y border-bordure">
            {points.map((p) => <li key={p} className="flex items-center gap-3 py-3.5 text-texte"><Check className="size-4 shrink-0 text-primaire" aria-hidden="true" />{p}</li>)}
          </ul>
          <Link to="/locataires" className="lien mt-8 inline-flex items-center gap-1.5 pb-1 font-semibold text-primaire">L'espace locataire<ArrowRight className="size-4" aria-hidden="true" /></Link>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Index éditorial des modules (pas de grille de cartes) ───────────────────── */

function ModulesIndex() {
  const top = features.filter((f) => ['loyers', 'paiement', 'relances', 'quittances', 'baux', 'incidents'].includes(f.id));
  return (
    <Section id="fonctionnalites" tone="surface">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionTitle eyebrow="Fonctionnalités" title="L'essentiel," accent="sans superflu." />
            <p className="mt-5 max-w-sm text-texte-secondaire">{features.length} modules au total, des immeubles aux états des lieux.</p>
            <Button to="/fonctionnalites" variant="contour" className="mt-8">Tous les modules<ArrowRight className="size-4" aria-hidden="true" /></Button>
          </div>
        </div>
        <ol className="border-t border-bordure lg:col-span-8">
          {top.map((f, i) => (
            <Reveal as="li" key={f.id} delay={0.03 * i}>
              <Link to={`/fonctionnalites#${f.id}`} className="group grid grid-cols-[2.5rem_1fr_auto] gap-x-4 border-b border-bordure py-7 sm:grid-cols-[3.5rem_14rem_1fr_auto] sm:gap-x-6">
                <span className="font-display pt-0.5 text-sm text-texte-discret">{String(i + 1).padStart(2, '0')}</span>
                <span className="t-titre text-texte transition-colors group-hover:text-primaire">{f.title}</span>
                <span className="col-start-2 mt-2 text-texte-secondaire sm:col-start-3 sm:mt-0">{f.text}</span>
                <ArrowUpRight className="col-start-3 row-start-1 size-5 text-texte-discret transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primaire sm:col-start-4" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ── Étapes : une frise, pas des cartes ──────────────────────────────────────── */

function Steps() {
  const steps = [
    ['Je crée mes biens', 'Immeubles, appartements, loyers et charges.'],
    ["J'invite mes locataires", 'Chacun active son espace personnel.'],
    ['Les loyers arrivent', 'Paiement, relances et quittances se font seuls.'],
  ];
  return (
    <Section tone="clair">
      <SectionTitle eyebrow="Mise en route" title="Opérationnel" accent="en trois étapes." />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        <span className="absolute top-[7px] right-0 left-0 hidden h-px bg-bordure-forte md:block" aria-hidden="true" />
        {steps.map(([t, d], i) => (
          <Reveal as="li" key={t} delay={i * 0.1} className="relative pl-8 md:pl-0">
            <span className="absolute top-1 left-0 size-[15px] rounded-full border-2 border-primaire bg-fond md:relative md:top-0 md:block" aria-hidden="true" />
            <p className="font-display mt-0 text-sm text-texte-discret md:mt-6">Étape {i + 1}</p>
            <p className="t-titre mt-1 text-texte">{t}</p>
            <p className="mt-2 max-w-xs text-texte-secondaire">{d}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ── À distance : photo plein cadre ──────────────────────────────────────────── */

function Distance() {
  return (
    <section className="relative isolate overflow-hidden bg-nuit text-white">
      <img src={images.goree.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="site-voile absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="py-[clamp(6rem,4rem+8vw,10rem)]">
        <Reveal className="max-w-2xl">
          <Eyebrow light>Propriétaires à distance</Eyebrow>
          <Display title="Vos biens au Sénégal," accent="suivis où que vous soyez." light className="mt-5" />
          <p className="t-chapo mt-6 max-w-xl text-white/80">
            À Dakar, à Thiès ou à l'étranger : consultez encaissements, retards et quittances depuis votre téléphone, sans attendre qu'un intermédiaire vous rende compte.
          </p>
          <Button to="/contact?sujet=acces" variant="blanc" size="lg" className="mt-10">Prendre contact<ArrowRight className="size-4" aria-hidden="true" /></Button>
        </Reveal>
      </Container>
    </section>
  );
}
