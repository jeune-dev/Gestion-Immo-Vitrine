import { Link } from 'react-router-dom';
import { site } from '@/content/site';
import { cx } from '@/utils/format';

/** Façade d'immeuble : une fenêtre allumée (or), celle du logement géré. */
export function LogoMark({ className = 'h-9 w-auto', light }) {
  const win = light ? '#0B2340' : '#FFFFFF';
  return (
    <svg viewBox="0 0 30 36" className={className} aria-hidden="true">
      <path d="M2 6.5 15 1l13 5.5V35H2z" fill={light ? '#FFFFFF' : 'var(--site-bleu)'} />
      {[0, 1, 2].map((r) => [0, 1].map((c) => (
        <rect key={`${r}${c}`} x={8 + c * 9} y={10 + r * 7} width="5" height="4" rx="0.6" fill={r === 1 && c === 1 ? 'var(--gi-secondaire)' : win} opacity={r === 1 && c === 1 ? 1 : 0.9} />
      )))}
    </svg>
  );
}

export function Logo({ light, className }) {
  return (
    <Link to="/" className={cx('group inline-flex items-center gap-3 rounded-[6px]', className)} aria-label={`${site.brand.name} — accueil`}>
      <LogoMark light={light} />
      <span className={cx('font-display leading-[1.05]', light ? 'text-white' : 'text-texte')}>
        <span className="block text-[15px] font-light">Gestion</span>
        <span className="block text-[15px] font-semibold">Immobilière</span>
      </span>
    </Link>
  );
}
