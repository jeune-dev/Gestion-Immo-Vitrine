/*
 * Contenu éditorial du site : un seul endroit à modifier.
 * Les coordonnées viennent des variables d'environnement ; un lien sans valeur est masqué.
 * Ne rien ajouter ici qui ne soit vrai (pas de faux témoignages ni de faux chiffres).
 */
const env = import.meta.env;
const phone = env.VITE_CONTACT_PHONE?.trim() || null;
const whatsapp = env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') || null;

export const site = {
  brand: {
    name: 'Kërimmo',
    short: 'Kërimmo',
    tagline: 'La gestion locative simplifiée',
  },
  appUrl: env.VITE_APP_URL?.trim() || null,
  contact: {
    email: env.VITE_CONTACT_EMAIL?.trim() || null,
    phone,
    phoneLabel: phone ? phone.replace(/^(\+221)(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5') : null,
    whatsapp,
    whatsappUrl: (text) => (whatsapp ? `https://wa.me/${whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : null),
  },
  // À renseigner lorsqu'ils existent : { label: 'Facebook', url: 'https://…' }
  social: [],
  // Témoignages réels uniquement : { quote, name, role }. Section masquée si vide.
  testimonials: [],
};

export const nav = [
  { to: '/fonctionnalites', label: 'Fonctionnalités' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/proprietaires', label: 'Propriétaires' },
  { to: '/locataires', label: 'Locataires' },
  { to: '/contact', label: 'Contact' },
];

export const faq = [
  {
    q: 'Comment mes locataires paient-ils leur loyer ?',
    a: "Depuis leur espace, par Wave ou Orange Money. Le paiement est rattaché automatiquement à la bonne échéance et la quittance est produite dès sa confirmation.",
  },
  {
    q: 'Les relances WhatsApp sont-elles automatiques ?',
    a: "Oui. Les locataires reçoivent des rappels WhatsApp avant et après l'échéance. Le nombre de messages inclus chaque mois dépend de votre plan.",
  },
  {
    q: "Que se passe-t-il si mon abonnement arrive à échéance ?",
    a: "Votre espace passe en lecture seule : vous gardez l'accès à toutes vos données et vous pouvez renouveler à tout moment pour reprendre la gestion.",
  },
  {
    q: 'Mes locataires voient-ils les informations des autres logements ?',
    a: "Non. Chaque locataire accède uniquement à son propre logement, à son bail, à ses échéances et à ses quittances.",
  },
  {
    q: 'Mon compte est-il protégé ?',
    a: "Les sessions sont sécurisées et vous pouvez activer la double authentification (code à 6 chiffres sur votre téléphone) pour protéger votre espace.",
  },
  {
    q: 'Puis-je changer de plan plus tard ?',
    a: "Oui. Si votre parc grandit, vous passez au plan supérieur pour gérer plus d'immeubles, d'appartements et de messages WhatsApp.",
  },
];
