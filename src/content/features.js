import {
  BarChart3, Building2, ClipboardCheck, FileSignature, MessageCircle, MessagesSquare,
  Receipt, ShieldCheck, Smartphone, Users, Wallet, Wrench,
} from 'lucide-react';

/** Modules de la plateforme, tels qu'ils existent dans l'API. */
export const features = [
  {
    id: 'biens', icon: Building2, title: 'Immeubles et appartements',
    text: 'Tout votre parc au même endroit : immeubles, lots, loyers de référence et disponibilité de chaque appartement.',
    points: ['Statut de chaque lot : disponible, occupé, en travaux', 'Photos et documents rattachés', 'Vue d\'ensemble de l\'occupation'],
  },
  {
    id: 'locataires', icon: Users, title: 'Locataires et invitations',
    text: 'Invitez vos locataires : ils activent leur compte et retrouvent leur logement, leur bail et leurs quittances.',
    points: ['Activation du compte par invitation', 'Chaque locataire ne voit que son logement', 'Historique complet par locataire'],
  },
  {
    id: 'baux', icon: FileSignature, title: 'Baux et modèles',
    text: 'Générez vos baux à partir de modèles prêts à l\'emploi, du brouillon à la signature, jusqu\'à la clôture.',
    points: ['Modèles de bail personnalisables', 'Suivi du bail : brouillon, actif, terminé', 'Document PDF prêt à signer'],
  },
  {
    id: 'loyers', icon: Wallet, title: 'Échéances et encaissement',
    text: 'Chaque mois, les échéances sont créées et suivies : à venir, à payer, payées, en retard. Vous savez qui doit quoi.',
    points: ['Paiements partiels pris en compte', 'Retards repérés immédiatement', 'Rapprochement automatique des paiements'],
  },
  {
    id: 'paiement', icon: Smartphone, title: 'Paiement Wave et Orange Money',
    text: 'Vos locataires paient depuis leur téléphone. Plus de déplacements, plus d\'espèces à compter.',
    points: ['Paiement mobile intégré', 'Confirmation en temps réel', 'Chaque paiement rattaché à son échéance'],
  },
  {
    id: 'relances', icon: MessageCircle, title: 'Relances WhatsApp',
    text: 'Les rappels partent seuls avant et après l\'échéance, sur l\'application que vos locataires lisent vraiment.',
    points: ['Messages envoyés automatiquement', 'Modèles de messages soignés', 'Quota mensuel selon votre plan'],
  },
  {
    id: 'quittances', icon: Receipt, title: 'Quittances automatiques',
    text: 'Dès qu\'un loyer est payé, la quittance PDF est produite et mise à disposition du locataire.',
    points: ['Quittance générée au paiement', 'Archivée et téléchargeable', 'Zéro saisie manuelle'],
  },
  {
    id: 'cautions', icon: ShieldCheck, title: 'Cautions et charges',
    text: 'Suivez chaque caution de son versement à sa restitution, et répartissez les charges de l\'immeuble.',
    points: ['Caution attendue, détenue, restituée', 'Retenues partielles justifiées', 'Charges à payer et payées'],
  },
  {
    id: 'incidents', icon: Wrench, title: 'Signalements et travaux',
    text: 'Le locataire signale un problème depuis son espace ; vous suivez l\'analyse, les travaux et la résolution.',
    points: ['Priorité : basse à urgente', 'Suivi des travaux et des artisans', 'Locataire informé à chaque étape'],
  },
  {
    id: 'edl', icon: ClipboardCheck, title: 'États des lieux',
    text: 'États des lieux d\'entrée et de sortie, soumis au locataire qui les accepte ou les conteste.',
    points: ['Entrée et sortie, pièce par pièce','Acceptation par le locataire', 'Document opposable en fin de bail'],
  },
  {
    id: 'rapports', icon: BarChart3, title: 'Rapports',
    text: 'Loyers encaissés, impayés, taux d\'occupation : les chiffres clés de votre parc, mois après mois.',
    points: ['Encaissements par période', 'Suivi des impayés', 'Indicateurs par immeuble'],
  },
  {
    id: 'messagerie', icon: MessagesSquare, title: 'Messagerie',
    text: 'Échangez avec vos locataires dans l\'application et gardez une trace de chaque conversation.',
    points: ['Conversations par logement', 'Notifications en temps réel', 'Historique conservé'],
  },
];
