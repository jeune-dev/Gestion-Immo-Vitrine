import { ArrowRight, BarChart3, Bell, ClipboardCheck, FileText, Receipt, ShieldCheck, Smartphone, Users, Wallet, Wrench } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { images } from '@/content/images';
import { Button, Reveal, Section, SectionTitle } from '@/components/common/ui';
import { DashboardMockup, PhoneMockup } from '@/components/home/Mockups';
import { CtaBand, PageHero } from '@/components/home/Blocks';

const pages = {
  proprietaires: {
    seo: ['Propriétaires', 'Suivez vos loyers, relancez automatiquement vos locataires sur WhatsApp et produisez vos quittances sans saisie.'],
    eyebrow: 'Pour les propriétaires',
    title: 'Votre parc locatif,',
    accent: 'piloté sans effort.',
    image: images.heroTour,
    text: "Que vous ayez un appartement ou plusieurs immeubles, gardez le contrôle sur vos loyers, vos locataires et vos travaux.",
    visual: <DashboardMockup />,
    benefits: [
      [Wallet, 'Des loyers suivis au franc près', 'Échéances créées chaque mois, paiements partiels pris en compte, retards signalés.'],
      [Bell, 'Des relances qui partent seules', 'Rappels WhatsApp avant et après l\'échéance, sans que vous ayez à y penser.'],
      [Receipt, 'Quittances et baux prêts', 'Quittance PDF au paiement, baux générés à partir de modèles.'],
      [ShieldCheck, 'Cautions maîtrisées', 'Du versement à la restitution, avec les retenues justifiées.'],
      [Wrench, 'Travaux sous contrôle', 'Signalements des locataires, priorités, artisans et suivi jusqu\'à la résolution.'],
      [BarChart3, 'Des chiffres utiles', 'Encaissements, impayés et occupation de chaque immeuble.'],
    ],
    cta: ['Démarrer avec mon parc', '/contact?sujet=acces'],
  },
  locataires: {
    seo: ['Locataires', 'Payez votre loyer par Wave ou Orange Money, recevez votre quittance et signalez un problème depuis votre téléphone.'],
    eyebrow: 'Pour les locataires',
    title: 'Votre logement,',
    accent: 'dans votre téléphone.',
    image: images.locataire,
    text: "Votre propriétaire utilise la plateforme ? Vous recevez une invitation pour activer votre espace personnel.",
    visual: <PhoneMockup />,
    benefits: [
      [Smartphone, 'Payer en un clic', 'Par Wave ou Orange Money, où que vous soyez, sans déplacement.'],
      [Receipt, 'Quittance immédiate', 'Disponible dès la confirmation de votre paiement, archivée pour vous.'],
      [Bell, 'Jamais de retard par oubli', 'Un rappel WhatsApp avant chaque échéance.'],
      [Wrench, 'Signaler un problème', 'Fuite, panne, travaux : décrivez-le et suivez sa résolution.'],
      [ClipboardCheck, 'États des lieux transparents', 'Consultez l\'état des lieux, acceptez-le ou contestez-le.'],
      [FileText, 'Tous vos documents', 'Bail, quittances et échéances, accessibles à tout moment.'],
    ],
    note: [Users, 'Votre accès est créé par votre propriétaire : vous ne voyez que votre propre logement.'],
  },
};

export default function Audience({ kind }) {
  const p = pages[kind];
  const NoteIcon = p.note?.[0];
  useSeo(...p.seo);
  return (
    <>
      <PageHero image={p.image} eyebrow={p.eyebrow} title={p.title} accent={p.accent} text={p.text} />
      <Section tone="creme">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <ul className="border-t border-bordure lg:col-span-7">
            {p.benefits.map(([I, t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.04} className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-bordure py-7">
                <I className="mt-1 size-5 text-primaire" aria-hidden="true" strokeWidth={1.6} />
                <div>
                  <h2 className="t-titre text-texte">{t}</h2>
                  <p className="mt-1.5 max-w-lg leading-relaxed text-texte-secondaire">{d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="flex justify-center lg:sticky lg:top-32 lg:col-span-5">{p.visual}</Reveal>
        </div>
        {NoteIcon && (
          <p className="mt-12 flex max-w-2xl items-start gap-3 border-l-2 border-primaire pl-4 text-texte">
            <NoteIcon className="mt-0.5 size-5 shrink-0 text-primaire" aria-hidden="true" />{p.note[1]}
          </p>
        )}
      </Section>
      {p.cta ? (
        <CtaBand />
      ) : (
        <Section tone="surface">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionTitle title="Votre propriétaire n'utilise pas encore" accent="la plateforme ?" text="Parlez-lui de nous, ou transmettez-nous ses coordonnées." />
            <Button to="/contact?sujet=recommandation" variant="contour" size="lg" className="self-start md:self-auto">Recommander la plateforme<ArrowRight className="size-4" aria-hidden="true" /></Button>
          </div>
        </Section>
      )}
    </>
  );
}
