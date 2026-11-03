import { Bell, CheckCircle2, MessageCircle, Receipt, Smartphone } from 'lucide-react';

/*
 * Aperçus du produit : tableau de bord en image (public/images), téléphone et bulle WhatsApp en HTML/CSS.
 * Les montants et noms sont des données d'illustration, signalées comme telles.
 */

export function DashboardMockup() {
  return (
    <figure className="overflow-hidden rounded-media border border-bordure bg-surface shadow-flottant">
      <div className="flex items-center gap-1.5 border-b border-bordure bg-surface-alt px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-bordure-forte" /><span className="size-2.5 rounded-full bg-bordure-forte" /><span className="size-2.5 rounded-full bg-bordure-forte" />
        <span className="ml-3 h-5 flex-1 rounded-pilule bg-surface" />
      </div>
      <img
        src="/images/apercu-tableau-de-bord.webp"
        alt="Aperçu du tableau de bord Kërimmo : loyers encaissés, taux d'occupation, loyers en retard et derniers baux (données d'illustration)"
        width="1672"
        height="941"
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
      <figcaption className="sr-only">Données d'illustration</figcaption>
    </figure>
  );
}

export function PhoneMockup({ className = '' }) {
  return (
    <figure className={`w-[220px] rounded-[34px] border-[6px] border-texte bg-surface p-3 shadow-flottant ${className}`} aria-label="Aperçu du paiement d'un loyer sur mobile (données d'illustration)">
      <div aria-hidden="true">
        <div className="mx-auto mb-3 h-1.5 w-16 rounded-pilule bg-bordure-forte" />
        <p className="text-[11px] font-medium text-texte-secondaire">Loyer d'octobre</p>
        <p className="gi-montant text-2xl font-semibold text-texte">150 000 <span className="text-sm">FCFA</span></p>
        <p className="mt-0.5 text-[11px] text-texte-secondaire">Apt B2 · échéance le 5</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 rounded-carte border-2 border-primaire bg-primaire-teinte p-2.5">
            <Smartphone className="size-4 text-primaire" /><span className="text-xs font-semibold text-texte">Wave</span>
            <CheckCircle2 className="ml-auto size-4 text-primaire" />
          </div>
          <div className="flex items-center gap-2 rounded-carte border border-bordure p-2.5">
            <Smartphone className="size-4 text-texte-secondaire" /><span className="text-xs font-semibold text-texte">Orange Money</span>
          </div>
        </div>
        <div className="mt-4 rounded-[8px] bg-primaire py-2.5 text-center text-xs font-semibold text-sur-primaire">Payer mon loyer</div>
        <div className="mt-3 flex items-center gap-2 rounded-carte bg-succes-fond p-2.5">
          <Receipt className="size-4 text-succes" /><span className="text-[11px] font-semibold text-succes">Quittance disponible</span>
        </div>
      </div>
      <figcaption className="sr-only">Données d'illustration</figcaption>
    </figure>
  );
}

export function WhatsappBubble({ className = '' }) {
  return (
    <div className={`w-64 rounded-carte border border-bordure bg-surface p-3 shadow-flottant ${className}`} aria-hidden="true">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-full bg-succes-fond text-succes"><MessageCircle className="size-4" /></span>
        <p className="text-xs font-semibold text-texte">Rappel WhatsApp</p>
        <Bell className="ml-auto size-3.5 text-texte-discret" />
      </div>
      <p className="mt-2 rounded-[10px] rounded-tl-[2px] bg-surface-alt p-2.5 text-[12px] leading-snug text-texte">
        Bonjour Fatou, votre loyer de 120 000 FCFA arrive à échéance le 5. Payez en un clic par Wave ou Orange Money.
      </p>
    </div>
  );
}
