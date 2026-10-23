const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

/** « 15 000 » : espace insécable entre les milliers, sans décimale (charte). */
export const nombre = (n) => (n == null ? '—' : nf.format(n).replace(/[   ]/g, ' '));

/** « 4 250 000 FCFA » ; XOF est affiché FCFA. */
export const montant = (n, currency = 'XOF') =>
  n == null ? '—' : `${nombre(n)} ${currency === 'XOF' ? 'FCFA' : currency}`;

/** Limite d'un plan : `null` = illimité. */
export const limite = (n, singulier, pluriel = `${singulier}s`) =>
  n == null ? `${pluriel[0].toUpperCase()}${pluriel.slice(1)} illimités` : `${nombre(n)} ${n > 1 ? pluriel : singulier}`;

export const periode = (p) => (p === 'annuel' ? 'an' : 'mois');

/** Concatène des classes CSS en ignorant les valeurs fausses. */
export const cx = (...c) => c.filter(Boolean).join(' ');
