# HAT

Prototype de l'app qui met en avant les nouveaux artistes autour de soi (lancement national ; données de démo situées autour d'Annecy) :
feed géolocalisé, profils artistes avec agenda, abonnement gratuit et don à l'artiste après le concert.

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build classique dans dist/
npm run lint       # Biome
```

`SINGLE=1 npm run build` produit un seul fichier `dist/index.html` autonome (c'est la version publiée en ligne).

## Écrans

| Ancre | Écran |
| --- | --- |
| `#accueil` | Landing de lancement |
| `#feed` | Feed local : bandeau « après le concert », filtres, cartes avec tag dons |
| `#artiste-<id>` | Profil public : agenda, sons, bio, bloc don |
| `#don-<id>` | Don après le concert, puis écran de remerciement |
| `#agenda` | Mon agenda, artistes suivis, mes soutiens |
| `#studio` | Espace artiste : profil, activation des dons, ajout de dates |

## Organisation

```
src/
  data.ts        données de démo (artistes, dates) + formatage
  store.tsx      état partagé (suivis, agenda, dons, profil du Studio), sauvegardé dans localStorage
  router.ts      routage par ancre
  components/    UI commune (tags, boutons Suivre, cartes) et en-têtes
  pages/         un fichier par écran
supabase/
  schema.sql     modèle de données cible
```

Le nom de l'app est centralisé dans `APP_NAME` (`src/data.ts`), la palette dans `src/index.css` (`@theme`).

## Étapes suivantes

1. Brancher Supabase (auth, tables de `supabase/schema.sql`) à la place de `data.ts` / `store.tsx`.
2. Requête géographique du feed avec PostGIS (`ST_DWithin`).
3. Dons via Stripe Connect (comptes Express pour les artistes, Checkout + webhook de confirmation).
4. Migration éventuelle vers Next.js : les composants de `src/pages` se reprennent tels quels.

Les éléments entre crochets (`[part reversée à l'artiste]`, `[Festival]`…) sont à compléter.
