# Autiva — annonces auto intelligentes

Site pour **chercher des annonces** auto (Québec / CAD) avec :

- **Cases** : neuf & offres, usagés, locations, reprises de bail, inspection & garage, location entre particuliers
- **Recherche détaillée** (marque, $/mois, mise de fonds, carburant, etc.)
- **Recherche intelligente** : l’utilisateur écrit en français, Autiva extrait l’intention

Exemple :

> « Je veux une sportive fiable à moins de 700 $ par mois, sans mise de fonds »

## Démarrage

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

## Structure

```
src/
  app/                      # Pages Next.js
    categories/[slug]/      # Une page par case
    search/                 # Recherche + filtres
    cars/[id]/             # Fiche annonce
    sell/                   # Publier
  components/
    layout/ cars/ search/ sell/
  data/                     # Annonces seed + catégories + filtres
  lib/smartSearch.ts        # Parser d’intention (FR)
  types/                    # Types TypeScript
```

## Données

Les annonces sont dans `src/data/cars.ts` (démo, pas encore d’API externe).  
Remplacez-les plus tard par un vrai flux d’annonces (API / scrapers / CMS).
