import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cx } from '@/utils/format';

const variants = {
  primaire: 'bg-primaire text-sur-primaire hover:bg-primaire-survol',
  secondaire: 'bg-secondaire text-sur-secondaire hover:bg-secondaire-survol',
  contour: 'border border-bordure-forte text-texte hover:border-texte',
  texte: 'px-0! text-primaire hover:text-primaire-survol',
  // Sur fond photo ou « nuit » :
  clair: 'text-white ring-1 ring-white/45 ring-inset hover:bg-white/10',
  blanc: 'bg-white text-bleu-marque hover:bg-white/90',
};
const sizes = { sm: 'h-10 px-5 text-sm', md: 'h-12 px-6 text-[15px]', lg: 'h-13 px-7 text-[15px]' };

/**
 * Bouton « pilule » : `to` (route interne), `href` (lien externe) ou bouton natif.
 * La flèche éventuelle (enfant `svg` final) glisse légèrement au survol.
 */
export function Button({ to, href, variant = 'primaire', size = 'md', className, children, ...rest }) {
  const cls = cx(
    'group/btn inline-flex items-center justify-center gap-2 rounded-pilule font-semibold whitespace-nowrap select-none',
    'transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondaire',
    'disabled:pointer-events-none disabled:opacity-50 [&>svg:last-child]:transition-transform [&>svg:last-child]:duration-200 hover:[&>svg:last-child]:translate-x-0.5',
    variants[variant], sizes[size], className,
  );
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

export function Container({ className, children }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10', className)}>{children}</div>;
}

const tones = { clair: 'bg-fond', surface: 'bg-surface', creme: 'bg-creme', nuit: 'bg-nuit text-white' };

/** Section pleine largeur ; `tone` alterne fonds clairs, crème et nuit. */
export function Section({ id, tone = 'clair', className, children, ...rest }) {
  return <section id={id} className={cx('py-[clamp(4.5rem,3rem+5vw,8rem)]', tones[tone], className)} {...rest}><Container>{children}</Container></section>;
}

export function Eyebrow({ children, className, light }) {
  return (
    <p className={cx('inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase', light ? 'text-secondaire' : 'text-primaire', className)}>
      {children}
    </p>
  );
}

/**
 * Grand titre Poppins fin ; `accent` s'affiche en gras italique à la suite.
 * Ex. <Display title="Vos loyers," accent="sans courir après." />
 */
export function Display({ as: Tag = 'h2', title, accent, light, size = 'display', className }) {
  return (
    <Tag className={cx(size === 'hero' ? 't-hero' : 't-display', 'text-balance', light ? 'text-white' : 'text-texte', className)}>
      {title}
      {accent && <> <span className={cx('font-semibold italic', light ? 'text-white' : 'text-primaire')}>{accent}</span></>}
    </Tag>
  );
}

export function SectionTitle({ eyebrow, title, accent, text, align = 'left', light, className }) {
  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Display title={title} accent={accent} light={light} className="mt-5" />
      {text && <p className={cx('t-chapo mt-5 text-pretty', light ? 'text-white/75' : 'text-texte-secondaire', align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl')}>{text}</p>}
    </div>
  );
}

/** Apparition douce au défilement (désactivée si l'utilisateur réduit les animations). */
export function Reveal({ children, delay = 0, y = 16, className, as = 'div' }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) { const Tag = as; return <Tag className={className}>{children}</Tag>; }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/** Photo, chargement différé sauf `priority` ; léger zoom au survol de son conteneur. */
export function Photo({ image, className, priority, sizes: s }) {
  return (
    <div className={cx('group/photo overflow-hidden rounded-media bg-surface-alt', className)}>
      <img
        src={image.src} alt={image.alt} loading={priority ? 'eager' : 'lazy'} decoding="async" sizes={s}
        className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover/photo:scale-[1.025] motion-reduce:transition-none"
      />
    </div>
  );
}

export function ErrorState({ title = 'Chargement impossible', message, onRetry }) {
  return (
    <div role="alert" className="mx-auto flex max-w-md flex-col items-center rounded-carte border border-bordure bg-surface px-6 py-10 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-avertissement-fond text-avertissement"><AlertTriangle className="size-6" aria-hidden="true" /></span>
      <p className="mt-4 font-semibold text-texte">{title}</p>
      {message && <p className="mt-1 text-sm text-texte-secondaire">{message}</p>}
      {onRetry && <Button variant="contour" size="sm" className="mt-5" onClick={onRetry}><RefreshCw className="size-4" aria-hidden="true" />Réessayer</Button>}
    </div>
  );
}

export const Skeleton = ({ className }) => <div className={cx('gi-skeleton', className)} aria-hidden="true" />;
