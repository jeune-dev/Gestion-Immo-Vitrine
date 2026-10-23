import { Check, Minus, Sparkles } from 'lucide-react';
import { usePlans } from '@/hooks/usePlans';
import { cx, limite, montant, periode } from '@/utils/format';
import { Button, ErrorState, Reveal, Skeleton } from '@/components/common/ui';

/** Tous les codes de fonctionnalités connus : ceux des référentiels, puis ceux des plans. */
function allFeatures(plans, libelles) {
  const codes = new Set(Object.keys(libelles));
  plans.forEach((p) => p.features?.forEach((f) => codes.add(f)));
  return [...codes];
}
const labelOf = (libelles, code) => libelles[code] ?? code.replace(/_/g, ' ');

/** Plan mis en avant : celui du milieu (ou le second s'il y en a deux). */
const highlightIndex = (n) => (n < 2 ? -1 : Math.floor((n - 1) / 2) + (n === 2 ? 1 : 0));

export function PlanGrid({ compact = false }) {
  const { data, error, loading, retry } = usePlans();

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3" role="status" aria-label="Chargement des tarifs">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-4 rounded-carte border border-bordure bg-surface p-7">
            <Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-40" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /><Skeleton className="h-4 w-4/6" /><Skeleton className="mt-6 h-11 w-full" />
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return <ErrorState title="Tarifs indisponibles" message={`${error.message} Vous pouvez aussi nous contacter pour connaître nos offres.`} onRetry={error.code === 'API_NON_CONFIGUREE' ? undefined : retry} />;
  }

  const { plans, libelles } = data;
  if (!plans.length) {
    return (
      <div className="mx-auto max-w-md rounded-carte border border-bordure bg-surface p-10 text-center">
        <p className="font-semibold text-texte">Aucune offre publiée pour le moment</p>
        <p className="mt-1 text-sm text-texte-secondaire">Contactez-nous pour une offre adaptée à votre parc.</p>
        <Button to="/contact?sujet=tarifs" variant="contour" size="sm" className="mt-5">Nous contacter</Button>
      </div>
    );
  }

  const codes = allFeatures(plans, libelles);
  const hi = highlightIndex(plans.length);

  return (
    <div className={cx('grid gap-6', plans.length >= 3 ? 'lg:grid-cols-3' : plans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'max-w-md mx-auto')}>
      {plans.map((p, i) => (
        <Reveal key={p.id ?? p.code} delay={i * 0.06}>
          <PlanCard plan={p} codes={compact ? p.features ?? [] : codes} libelles={libelles} highlighted={i === hi} />
        </Reveal>
      ))}
    </div>
  );
}

function PlanCard({ plan, codes, libelles, highlighted }) {
  const has = new Set(plan.features ?? []);
  return (
    <article
      className={cx(
        'relative flex h-full flex-col rounded-carte border bg-surface p-8 transition-[border-color] duration-200 hover:border-bordure-forte',
        highlighted ? 'border-secondaire ring-1 ring-secondaire' : 'border-bordure',
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-pilule bg-secondaire px-3 py-1 text-xs font-semibold text-sur-secondaire">
          <Sparkles className="size-3.5" aria-hidden="true" />Le plus choisi
        </span>
      )}
      <h3 className="font-display text-xl font-medium text-texte">{plan.name}</h3>
      {plan.description && <p className="mt-1 text-sm text-texte-secondaire">{plan.description}</p>}
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="gi-montant font-display text-4xl font-light tracking-tight text-texte">{montant(plan.price, plan.currency)}</span>
        <span className="text-sm text-texte-secondaire">/ {periode(plan.billing_period)}</span>
      </p>

      <ul className="mt-6 space-y-2.5 border-y border-bordure py-5 text-sm text-texte">
        <li>{limite(plan.max_buildings, 'immeuble')}</li>
        <li>{limite(plan.max_apartments, 'appartement')}</li>
        <li>{plan.max_whatsapp_per_month == null ? 'Messages WhatsApp illimités' : `${limite(plan.max_whatsapp_per_month, 'message')} WhatsApp / mois`}</li>
      </ul>

      {codes.length > 0 && (
        <ul className="mt-5 space-y-3 text-sm">
          {codes.map((c) => {
            const ok = has.has(c);
            return (
              <li key={c} className={cx('flex items-start gap-2.5', ok ? 'text-texte' : 'text-texte-discret')}>
                {ok ? <Check className="mt-0.5 size-4 shrink-0 text-succes" aria-hidden="true" /> : <Minus className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
                <span>{labelOf(libelles, c)}<span className="sr-only">{ok ? ' : inclus' : ' : non inclus'}</span></span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-auto pt-8">
        <Button to={`/contact?sujet=abonnement&plan=${encodeURIComponent(plan.code)}`} variant={highlighted ? 'primaire' : 'contour'} className="w-full">
          Choisir {plan.name}
        </Button>
      </div>
    </article>
  );
}
