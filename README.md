# Gestion Immobilière — Site vitrine

Site public de la plateforme (React, Vite, Tailwind v4, JavaScript). Indépendant de l'administration (`../gestion_immo_admin`) ; le backend n'est pas modifié.

## Démarrage

```bash
npm install
cp .env.example .env   # puis renseigner les variables
npm run dev            # http://localhost:5180
```

`npm run build` produit `dist/` (site statique). Le serveur web doit renvoyer `index.html` pour toutes les routes (application à page unique).

## Variables

| Variable | Rôle |
|---|---|
| `VITE_API_URL` | URL de l'API, préfixe `/api/v1` inclus. Sans elle, la page Tarifs affiche « Tarifs indisponibles ». |
| `VITE_APP_URL` | Application des propriétaires et des locataires ; le lien « Se connecter » est masqué si la variable est vide. |
| `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE`, `VITE_WHATSAPP_NUMBER` | Coordonnées officielles ; chaque lien est masqué si sa valeur est vide. |

## API utilisée

Routes publiques uniquement, sans jeton ni cookie :

- `GET /abonnement/plans` : plans affichés sur l'accueil et la page Tarifs ;
- `GET /referentiels` : libellés des fonctionnalités (`FONCTIONNALITE`).

Côté API, ajouter l'origine du site (ex. `http://localhost:5180`) à `CORS_ORIGIN`. C'est un réglage, pas une modification du code.

## Ce qui manque côté backend (non inventé ici)

- **Contact** : aucune route. Le formulaire valide la saisie puis prépare un e-mail (`mailto:`) ou un message WhatsApp ; rien n'est enregistré.
- **Inscription d'un propriétaire** : aucune route publique dans le contrat admin. Les boutons « Démarrer » mènent au contact.
- **Témoignages, chiffres clés, réseaux sociaux** : aucune source. À renseigner dans `src/content/site.js` ; les sections restent masquées tant qu'elles sont vides.
- **Mentions légales et confidentialité** : gabarits à compléter (`src/pages/Legal.jsx`) ; les éléments entre crochets sont à remplacer.

## Structure

```
src/
  components/  layout/ (Header, Footer, Layout), common/ (ui, Logo), home/ (Mockups, Blocks), pricing/ (Plans)
  content/     site.js (textes, FAQ, coordonnées), features.js (modules)
  hooks/       useAsync, usePlans, useSeo
  pages/       Home, Features, Pricing, Audience (propriétaires / locataires), Contact, Legal, NotFound
  services/    api.js (Axios, erreurs normalisées), catalogService.js (plans, référentiels)
  theme/       theme.css (charte « Bleu confiance et or », copie de l'admin)
```
