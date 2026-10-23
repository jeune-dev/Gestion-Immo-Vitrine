import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { nav, site } from '@/content/site';
import { Container } from '@/components/common/ui';
import { Logo } from '@/components/common/Logo';

const linkCls = 'text-sm text-white/65 transition-colors hover:text-white';

export function Footer() {
  const { email, phone, phoneLabel, whatsappUrl } = site.contact;
  const wa = whatsappUrl();
  const hasContact = email || phone || wa;

  return (
    <footer className="bg-nuit text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            La plateforme de gestion locative des propriétaires : loyers encaissés par mobile, relances WhatsApp et quittances automatiques.
          </p>
        </div>
        <FooterCol title="Plateforme">
          {nav.filter((l) => l.to !== '/contact').map((l) => <li key={l.to}><Link to={l.to} className={linkCls}>{l.label}</Link></li>)}
        </FooterCol>
        <FooterCol title="Informations">
          <li><Link to="/contact" className={linkCls}>Contact</Link></li>
          <li><Link to="/mentions-legales" className={linkCls}>Mentions légales</Link></li>
          <li><Link to="/confidentialite" className={linkCls}>Confidentialité</Link></li>
          {site.appUrl && <li><a href={site.appUrl} className={linkCls}>Se connecter</a></li>}
        </FooterCol>
        {hasContact && (
          <FooterCol title="Nous joindre">
            {phone && <li><a href={`tel:${phone}`} className={`${linkCls} inline-flex items-center gap-2`}><Phone className="size-4" aria-hidden="true" />{phoneLabel}</a></li>}
            {wa && <li><a href={wa} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2`}><MessageCircle className="size-4" aria-hidden="true" />WhatsApp</a></li>}
            {email && <li><a href={`mailto:${email}`} className={`${linkCls} inline-flex items-center gap-2 break-all`}><Mail className="size-4 shrink-0" aria-hidden="true" />{email}</a></li>}
            {site.social.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className={linkCls}>{s.label}</a></li>)}
          </FooterCol>
        )}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 pr-20 text-sm text-white/50 sm:flex-row sm:justify-between lg:pr-24">
        <p>© {new Date().getFullYear()} {site.brand.name}. Tous droits réservés.</p>
        <p>Paiements Wave · Orange Money · Relances WhatsApp</p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <p className="font-display text-sm font-semibold tracking-wide text-secondaire uppercase">{title}</p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
