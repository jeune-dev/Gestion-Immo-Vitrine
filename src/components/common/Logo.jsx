import { Link } from 'react-router-dom';
import { site } from '@/content/site';
import { cx } from '@/utils/format';

/** Icône Kërimmo (maison, immeubles et courbe verte), tirée du logo officiel. */
export function LogoMark({ className = 'size-10' }) {
  return <img src="/kerimmo-icone.png" alt="" aria-hidden="true" className={cx('shrink-0 rounded-lg', className)} />;
}

export function Logo({ light, className }) {
  return (
    <Link to="/" className={cx('group inline-flex items-center gap-3 rounded-[6px]', className)} aria-label={`${site.brand.name} — accueil`}>
      <LogoMark light={light} />
      <span className={cx('font-display text-xl font-semibold tracking-tight', light ? 'text-white' : 'text-texte')}>
        Kër<span className="text-[#3FA51F]">immo</span>
      </span>
    </Link>
  );
}
