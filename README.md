# Un franc par mille — Site de l'initiative

Site vitrine multilingue (FR/DE/IT/EN) pour l'initiative populaire fédérale suisse « Un franc par mille ».

## Fonctionnalités

- **Site vitrine** : page d'accueil complète avec argumentaire, chiffres, FAQ
- **Formulaire de signature** : génération immédiate d'une liste PDF adaptée à la commune
- **Autocomplétion NPA/commune** : via l'API geo.admin.ch
- **Formulaire bénévole** : inscription des volontaires
- **QR Code** : partage facile de la page de signature
- **CRM admin** : gestion des demandes et bénévoles avec export CSV
- **Multilingue** : FR, DE, IT, EN

## Stack technique

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** v4
- **pdf-lib** pour la génération PDF côté serveur
- **better-sqlite3** pour la base de données
- **geo.admin.ch** pour la recherche NPA/commune

## Démarrage rapide

```bash
npm install
cp .env.example .env
# Modifier ADMIN_PASSWORD dans .env
npm run dev
```

Le site est accessible sur `http://localhost:3000`.
L'admin est accessible sur `http://localhost:3000/admin` (identifiant: `admin`, mot de passe: celui défini dans `.env`).

## Déploiement sur Infomaniak

1. Créer un site Node.js sur l'hébergement Infomaniak
2. Configurer le projet via Git ou upload
3. Définir les variables d'environnement (ADMIN_PASSWORD, NODE_ENV=production)
4. Lancer `npm install && npm run build && npm start`

## Structure du projet

```
src/
├── app/
│   ├── [lang]/          # Pages publiques multilingues
│   ├── admin/           # Espace d'administration
│   └── api/             # Routes API
├── components/          # Composants React
├── dictionaries/        # Traductions FR/DE/IT/EN
└── lib/                 # Utilitaires (i18n, db, pdf, auth)
```
