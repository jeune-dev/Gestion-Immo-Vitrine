import { Bell, Building2, CheckCircle2, LayoutDashboard, MessageCircle, Receipt, Smartphone, Users, Wallet } from 'lucide-react';

/*
 * Aperçus du produit dessinés en HTML/CSS (aucune capture d'écran).
 * Les montants et noms sont des données d'illustration, signalées comme telles.
 */

const rows = [
  { name: 'A. Diallo', lot: 'Apt B2', amount: '150 000', label: 'Payé', ton: 'succes' },
  { name: 'F. Ndiaye', lot: 'Apt A1', amount: '120 000', label: 'À payer', ton: 'avertissement' },
  { name: 'M. Sow', lot: 'Apt C4', amount: '185 000', label: 'En retard', ton: 'danger' },
  { name: 'K. Fall', lot: 'Apt B1', amount: '150 000', label: 'Payé', ton: 'succes' },
];
const bars = [52, 64, 58, 72, 80, 76, 88, 94];

export function DashboardMockup() {
  return (
    <figure className="overflow-hidden rounded-media border border-bordure bg-surface shadow-flottant" aria-label="Aperçu du tableau de bord propriétaire (données d'illustration)">
      <div className="flex items-center gap-1.5 border-b border-bordure bg-surface-alt px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-bordure-forte" /><span className="size-2.5 rounded-full bg-bordure-forte" /><span className="size-2.5 rounded-full bg-bordure-forte" />
        <span className="ml-3 h-5 flex-1 rounded-pilule bg-surface" />
      </div>
      <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[150px_1fr]" aria-hidden="true">
        <aside className="space-y-1 border-r border-bordure p-2 sm:p-3">
          {[[LayoutDashboard, 'Tableau de bord', true], [Building2, 'Immeubles'], [Users, 'Locataires'], [Wallet, 'Loyers'], [Receipt, 'Quittances']].map(([I, l, a]) => (
            <div key={l} className={`flex items-center gap-2 rounded-[8px] px-2 py-2 text-xs font-medium ${a ? 'bg-primaire-teinte text-primaire' : 'text-texte-secondaire'}`}>
              <I className="size-4 shrink-0" /><span className="hidden sm:inline">{l}</span>
            </div>
          ))}
        </aside>
        <div className="min-w-0 space-y-3 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Kpi label="Encaissé ce mois" value="2 450 000" unit="FCFA" />
            <Kpi label="Occupation" value="94" unit="%" />
            <Kpi label="En retard" value="2" unit="loyers" danger />
          </div>
          <div className="rounded-carte border border-bordure p-3">
            <p className="text-[11px] font-semibold text-texte-secondaire">Loyers encaissés</p>
            <div className="mt-2 flex h-20 items-end gap-1.5">
              {bars.map((h, i) => (
                <span key={i} className={`flex-1 rounded-t-[4px] ${i === bars.length - 1 ? 'bg-secondaire' : 'bg-primaire/80'}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-carte border border-bordure">
            {rows.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-2 border-b border-bordure px-3 py-2 last:border-0">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-texte">{r.name}</p>
                  <p className="text-[11px] text-texte-secondaire">{r.lot}</p>
                </div>
                <span className="gi-montant hidden text-xs text-texte sm:inline">{r.amount} FCFA</span>
                <span className="gi-badge" data-ton={r.ton}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="sr-only">Données d'illustration</figcaption>
    </figure>
  );
}

function Kpi({ label, value, unit, danger }) {
  return (
    <div className="rounded-carte border border-bordure p-2 sm:p-3">
      <p className="truncate text-[10px] font-medium text-texte-secondaire sm:text-[11px]">{label}</p>
      <p className={`gi-montant mt-1 text-sm font-semibold sm:text-lg ${danger ? 'text-danger' : 'text-texte'}`}>
        {value} <span className="text-[10px] font-medium text-texte-secondaire">{unit}</span>
      </p>
    </div>
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
