import { getLibelles, getPlans } from '@/services/catalogService';
import { useAsync } from './useAsync';

/** Plans publics + libellés des fonctionnalités (`FONCTIONNALITE`). */
export function usePlans() {
  return useAsync(async () => {
    const [plans, libelles] = await Promise.all([getPlans(), getLibelles('FONCTIONNALITE').catch(() => ({}))]);
    return { plans, libelles };
  });
}
