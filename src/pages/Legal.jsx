import { AlertTriangle } from 'lucide-react';
import { site } from '@/content/site';
import { images } from '@/content/images';
import { useSeo } from '@/hooks/useSeo';
import { Container } from '@/components/common/ui';
import { PageHero } from '@/components/home/Blocks';

/*
 * Gabarits à compléter avec les informations juridiques réelles de l'entreprise.
 * Les passages entre crochets sont à remplacer avant la mise en ligne.
 */
const docs = {
  mentions: {
    seo: ['Mentions légales', `Mentions légales du site ${site.brand.name}.`],
    title: 'Mentions légales',
    sections: [
      ['Éditeur du site', `${site.brand.name} — [raison sociale, forme juridique, capital], [adresse du siège], [NINEA / RCCM]. Directeur de la publication : [nom].`],
      ['Hébergement', '[Nom de l\'hébergeur], [adresse], [téléphone].'],
      ['Propriété intellectuelle', `L'ensemble des contenus de ce site (textes, visuels, logo) est la propriété de ${site.brand.name}, sauf mention contraire. Toute reproduction sans autorisation est interdite.`],
      ['Contact', site.contact.email ? `Pour toute question : ${site.contact.email}.` : 'Pour toute question, utilisez la page Contact.'],
    ],
  },
  confidentialite: {
    seo: ['Politique de confidentialité', `Politique de confidentialité du site ${site.brand.name}.`],
    title: 'Politique de confidentialité',
    sections: [
      ['Données collectées par ce site', 'Ce site vitrine n\'enregistre aucune donnée personnelle : le formulaire de contact prépare un message dans votre propre messagerie (e-mail ou WhatsApp), que vous choisissez d\'envoyer.'],
      ['Cookies', 'Ce site ne dépose aucun cookie de suivi ni de mesure d\'audience.'],
      ['Données de la plateforme', 'Les données traitées dans l\'application (propriétaires, locataires, baux, paiements) relèvent des conditions d\'utilisation de la plateforme : [lien ou référence à compléter].'],
      ['Vos droits', 'Conformément à la loi sénégalaise n° 2008-12 sur la protection des données à caractère personnel, vous disposez d\'un droit d\'accès, de rectification et d\'opposition : [contact du responsable à compléter].'],
    ],
  },
};

export default function Legal({ kind }) {
  const d = docs[kind];
  useSeo(...d.seo);
  return (
    <>
      <PageHero image={images.facade} title={d.title} />
      <Container className="max-w-3xl py-20">
        <p className="mb-8 flex items-start gap-2 rounded-carte bg-avertissement-fond p-4 text-sm font-medium text-avertissement" role="note">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />Document à compléter : les éléments entre crochets doivent être renseignés avant la mise en ligne.
        </p>
        <div className="space-y-8 rounded-carte border border-bordure bg-surface p-7 sm:p-10">
          {d.sections.map(([t, p]) => (
            <section key={t}>
              <h2 className="text-lg font-semibold text-texte">{t}</h2>
              <p className="mt-2 leading-relaxed text-texte-secondaire">{p}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
