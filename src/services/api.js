import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

/** Erreur normalisée : l'interface se branche sur `code`, jamais sur `message`. */
export class ApiError extends Error {
  constructor({ status, code, message, requestId }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

// Le site n'appelle que des routes publiques : aucun jeton, aucun cookie.
const http = axios.create({ baseURL: BASE_URL, timeout: 12000 });

function normalize(err) {
  if (!BASE_URL) return new ApiError({ status: 0, code: 'API_NON_CONFIGUREE', message: "L'adresse de l'API n'est pas configurée." });
  const res = err.response;
  if (!res) return new ApiError({ status: 0, code: 'RESEAU', message: 'Connexion impossible. Vérifiez votre réseau puis réessayez.' });
  const body = res.data ?? {};
  if (res.status === 429) return new ApiError({ status: 429, code: 'TROP_DE_REQUETES', message: 'Trop de requêtes. Patientez quelques instants.' });
  return new ApiError({
    status: res.status,
    code: body.error?.code ?? 'ERREUR',
    message: res.status >= 500 ? 'Le service est momentanément indisponible.' : body.error?.message ?? body.message ?? 'Une erreur est survenue.',
    requestId: body.requestId ?? res.headers?.['x-request-id'],
  });
}

/** GET d'une route publique ; renvoie `data` de l'enveloppe. */
export async function get(url, config) {
  if (!BASE_URL) throw normalize();
  try {
    const res = await http.get(url, config);
    return res.data?.data;
  } catch (err) {
    throw normalize(err);
  }
}
