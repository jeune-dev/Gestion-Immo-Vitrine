import { get } from './api';

// Plans et référentiels changent rarement : un appel par visite suffit.
const cache = new Map();
function once(key, load) {
  if (!cache.has(key)) cache.set(key, load().catch((e) => { cache.delete(key); throw e; }));
  return cache.get(key);
}

/** Plans publics actifs, triés par `sort_order`. */
export const getPlans = () =>
  once('plans', async () => {
    const data = await get('/abonnement/plans');
    const plans = Array.isArray(data) ? data : data?.plans ?? data?.items ?? [];
    return plans.filter((p) => !p.status || p.status === 'actif').sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  });

/** Libellés des codes métier (`GET /referentiels`), indexés par code. */
export const getLibelles = (enumeration) =>
  once('referentiels', () => get('/referentiels')).then((r) =>
    Object.fromEntries((r?.enumerations?.[enumeration] ?? []).map((e) => [e.code, e.label])),
  );
