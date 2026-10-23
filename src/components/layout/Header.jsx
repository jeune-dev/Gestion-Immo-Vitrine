import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, LogIn, Menu, X } from 'lucide-react';
import { nav, site } from '@/content/site';
import { cx } from '@/utils/format';
import { Button, Container } from '@/components/common/ui';
import { Logo } from '@/components/common/Logo';

/** En-tête fixe : transparent sur le bandeau photo, plein dès qu'on fait défiler. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const solid = scrolled || open;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const linkCls = ({ isActive }) =>
    cx(
      'relative rounded-[6px] px-3.5 py-2 text-[15px] font-medium transition-colors duration-200',
      solid ? (isActive ? 'text-primaire' : 'text-texte-secondaire hover:text-texte') : (isActive ? 'text-white' : 'text-white/75 hover:text-white'),
      'after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-px after:origin-left after:bg-secondaire after:transition-transform after:duration-300',
      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
    );

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300',
        solid ? 'border-b border-bordure bg-fond/92 backdrop-blur-md' : 'border-b border-white/12 bg-transparent',
      )}
    >
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-[8px] focus:bg-surface focus:px-4 focus:py-2 focus:text-texte">Aller au contenu</a>
      <Container className="flex h-[76px] items-center justify-between gap-4">
        <Logo light={!solid} />
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {nav.map((l) => <NavLink key={l.to} to={l.to} className={linkCls}>{l.label}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {site.appUrl && <Button href={site.appUrl} variant={solid ? 'texte' : 'clair'} size="sm"><LogIn className="size-4" aria-hidden="true" />Se connecter</Button>}
          <Button to="/contact?sujet=acces" variant="secondaire" size="sm">Démarrer<ArrowRight className="size-4" aria-hidden="true" /></Button>
        </div>
        <button
          type="button"
          className={cx('grid size-11 place-items-center rounded-full lg:hidden', solid ? 'text-texte hover:bg-surface-alt' : 'text-white hover:bg-white/10')}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-bordure bg-fond lg:hidden"
          >
            <Container className="flex h-[calc(100dvh-76px)] flex-col py-6">
              <nav aria-label="Navigation mobile" className="flex flex-col divide-y divide-bordure border-y border-bordure">
                {nav.map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}>
                    <NavLink to={l.to} className={({ isActive }) => cx('font-display flex items-center justify-between py-4 text-2xl', isActive ? 'font-semibold text-primaire' : 'font-light text-texte')}>
                      {l.label}
                      <ArrowRight className="size-5 text-texte-discret" aria-hidden="true" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pb-6">
                {site.appUrl && <Button href={site.appUrl} variant="contour" size="lg">Se connecter</Button>}
                <Button to="/contact?sujet=acces" variant="secondaire" size="lg">Démarrer<ArrowRight className="size-4" aria-hidden="true" /></Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
