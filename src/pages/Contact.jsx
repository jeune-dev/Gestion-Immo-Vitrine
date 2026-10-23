import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { site } from '@/content/site';
import { images } from '@/content/images';
import { useSeo } from '@/hooks/useSeo';
import { cx } from '@/utils/format';
import { Button, Container } from '@/components/common/ui';
import { PageHero } from '@/components/home/Blocks';

const subjects = {
  acces: 'Demande d\'accès à la plateforme',
  abonnement: 'Souscrire un abonnement',
  tarifs: 'Question sur les tarifs',
  recommandation: 'Recommander la plateforme à mon propriétaire',
  autre: 'Autre demande',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s.-]{8,20}$/;

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Indiquez votre nom.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Adresse e-mail invalide.';
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = 'Numéro invalide (ex. +221 77 000 00 00).';
  if (f.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.';
  if (f.message.length > 2000) e.message = 'Votre message ne doit pas dépasser 2 000 caractères.';
  return e;
}

/*
 * L'API n'expose aucune route de contact : le formulaire prépare un e-mail
 * (ou un message WhatsApp) dans l'application de l'utilisateur, sans rien envoyer lui-même.
 */
export default function Contact() {
  useSeo('Contact', 'Contactez-nous pour démarrer, choisir un abonnement ou poser une question.');
  const [params] = useSearchParams();
  const plan = params.get('plan');
  const initialSubject = subjects[params.get('sujet')] ? params.get('sujet') : 'acces';
  const [f, setF] = useState({
    name: '', email: '', phone: '', subject: initialSubject,
    message: plan ? `Bonjour, je souhaite souscrire au plan ${plan}.` : '',
  });
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(null);
  const { email, phone, phoneLabel, whatsappUrl } = site.contact;
  const canSend = Boolean(email || whatsappUrl());

  const set = (k) => (e) => { setF((s) => ({ ...s, [k]: e.target.value })); if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined })); };

  const body = () =>
    `${f.message.trim()}\n\n— ${f.name.trim()}\n${f.email.trim()}${f.phone.trim() ? `\n${f.phone.trim()}` : ''}`;

  const submit = (channel) => (e) => {
    e?.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`champ-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (channel === 'whatsapp') window.open(whatsappUrl(`${subjects[f.subject]}\n\n${body()}`), '_blank', 'noopener');
    else window.location.href = `mailto:${email}?subject=${encodeURIComponent(subjects[f.subject])}&body=${encodeURIComponent(body())}`;
    setOpened(channel);
  };

  return (
    <>
      <PageHero image={images.dakar} eyebrow="Contact" title="Parlons de" accent="votre parc." text="Une question, une démonstration ou l'ouverture de votre espace : écrivez-nous." />
      <div className="bg-creme">
      <Container className="grid gap-8 py-20 lg:grid-cols-[1fr_1.5fr]">
        <aside className="min-w-0 space-y-4">
          {phone && <ContactCard icon={Phone} title="Téléphone" href={`tel:${phone}`} label={phoneLabel} />}
          {whatsappUrl() && <ContactCard icon={MessageCircle} title="WhatsApp" href={whatsappUrl()} label="Écrire sur WhatsApp" external />}
          {email && <ContactCard icon={Mail} title="E-mail" href={`mailto:${email}`} label={email} />}
          {!phone && !email && !whatsappUrl() && (
            <div className="rounded-carte border border-bordure bg-surface p-6 text-sm text-texte-secondaire">
              Les coordonnées seront affichées ici dès qu'elles seront configurées.
            </div>
          )}
        </aside>

        <form noValidate onSubmit={submit(email ? 'email' : 'whatsapp')} className="min-w-0 rounded-carte border border-bordure bg-surface p-6 sm:p-10" aria-describedby="note-envoi">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Nom complet" required value={f.name} onChange={set('name')} error={errors.name} autoComplete="name" />
            <Field id="email" label="E-mail" type="email" required value={f.email} onChange={set('email')} error={errors.email} autoComplete="email" />
            <Field id="phone" label="Téléphone" type="tel" value={f.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" hint="Facultatif" />
            <div>
              <label htmlFor="champ-subject" className="mb-1.5 block text-sm font-medium text-texte">Sujet</label>
              <select id="champ-subject" className="gi-champ h-11" value={f.subject} onChange={set('subject')}>
                {Object.entries(subjects).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <Field id="message" label="Message" as="textarea" required value={f.message} onChange={set('message')} error={errors.message} maxLength={2000} />
            </div>
          </div>

          <p id="note-envoi" className="mt-5 flex items-start gap-2 text-sm text-texte-secondaire">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {canSend
              ? 'Votre message s\'ouvrira dans votre messagerie, prêt à être envoyé. Aucune donnée n\'est enregistrée par ce site.'
              : "L'envoi de message n'est pas encore disponible : aucune adresse de contact n'est configurée."}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {email && <Button type="submit" size="lg" disabled={!canSend}><Send className="size-4" aria-hidden="true" />Préparer l'e-mail</Button>}
            {whatsappUrl() && (
              <Button variant={email ? 'contour' : 'primaire'} size="lg" onClick={submit('whatsapp')}>
                <MessageCircle className="size-4" aria-hidden="true" />Envoyer sur WhatsApp
              </Button>
            )}
            {!canSend && <Button type="submit" size="lg" disabled>Envoyer</Button>}
          </div>

          {opened && (
            <p role="status" className="mt-5 rounded-carte bg-succes-fond p-4 text-sm font-medium text-succes">
              {opened === 'whatsapp' ? 'WhatsApp s\'est ouvert avec votre message : il ne vous reste qu\'à l\'envoyer.' : 'Votre messagerie s\'est ouverte avec votre message : il ne vous reste qu\'à l\'envoyer.'}
            </p>
          )}
        </form>
      </Container>
      </div>
    </>
  );
}

function ContactCard({ icon: I, title, href, label, external }) {
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center gap-4 rounded-carte border border-bordure bg-surface p-5 transition-colors duration-200 hover:border-primaire">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primaire-teinte text-primaire"><I className="size-5" aria-hidden="true" /></span>
      <span className="min-w-0"><span className="block text-sm text-texte-secondaire">{title}</span><span className="block truncate font-semibold text-texte">{label}</span></span>
    </a>
  );
}

function Field({ id, label, as = 'input', error, hint, required, ...rest }) {
  const Tag = as;
  const describedBy = [error && `erreur-${id}`, hint && `aide-${id}`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={`champ-${id}`} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-texte">
        <span>{label}{required && <span className="text-danger" aria-hidden="true"> *</span>}</span>
        {hint && <span id={`aide-${id}`} className="text-xs font-normal text-texte-secondaire">{hint}</span>}
      </label>
      <Tag
        id={`champ-${id}`}
        className={cx('gi-champ', as === 'textarea' ? 'min-h-36 py-3' : 'h-11')}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        {...rest}
      />
      {error && <p id={`erreur-${id}`} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}
