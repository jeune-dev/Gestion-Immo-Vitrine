import { getLibelles, getPlans } from '@/services/catalogService';
import { useAsync } from './useAsync';

/**
 * Plans publics + libellés des fonctionnalités (`FONCTIONNALITE`).
 * L'API renvoie `features` sous la forme [{ code, label }] : on la ramène à une
 * liste de codes et on complète les libellés avec ceux fournis par le plan.
 */
export function usePlans() {
  return useAsync(async () => {
    const [plansBruts, libellesRef] = await Promise.all([getPlans(), getLibelles('FONCTIONNALITE').catch(() => ({}))]);
    const libelles = { ...libellesRef };
    const plans = plansBruts.map((p) => ({
      ...p,
      features: (p.features ?? []).map((f) => {
        if (f && typeof f === 'object') {
          if (f.label && !libelles[f.code]) libelles[f.code] = f.label;
          return String(f.code);
        }
        return String(f);
      }),
    }));
    return { plans, libelles };
  });
}
