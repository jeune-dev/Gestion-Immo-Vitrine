import { useCallback, useEffect, useState } from 'react';

/** Charge une ressource asynchrone : { data, error, loading, retry }. */
export function useAsync(load) {
  const [state, setState] = useState({ data: undefined, error: null, loading: true });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, error: null, loading: true }));
    load().then(
      (data) => alive && setState({ data, error: null, loading: false }),
      (error) => alive && setState({ data: undefined, error, loading: false }),
    );
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
