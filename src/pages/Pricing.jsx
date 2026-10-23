import { useSeo } from '@/hooks/useSeo';
import { Container } from '@/components/common/ui';
import { CtaBand, Faq, PageHero } from '@/components/home/Blocks';
import { PlanGrid } from '@/components/pricing/Plans';
import { faq } from '@/content/site';
import { images } from '@/content/images';

export default function Pricing() {
  useSeo('Tarifs', "Des abonnements mensuels en FCFA selon le nombre d'immeubles, d'appartements et de messages WhatsApp.");
  return (
    <>
      <PageHero image={images.salon} eyebrow="Tarifs" title="Le plan qui suit" accent="votre parc." text="Tous les plans incluent l'espace locataire. Changez de plan à tout moment quand votre patrimoine grandit." />
      <section className="bg-surface py-20 sm:py-24">
        <Container><PlanGrid /></Container>
        <p className="mt-12 px-4 text-center text-sm text-texte-secondaire">Prix en francs CFA. Si votre abonnement arrive à échéance, vos données restent consultables en lecture seule.</p>
      </section>
      <Faq items={faq.filter((f) => /abonnement|plan/i.test(f.q))} />
      <CtaBand title="Une question sur les offres ?" accent="Parlons-en." text="Présentez-nous votre parc : nous vous aidons à choisir le plan adapté." />
    </>
  );
}
