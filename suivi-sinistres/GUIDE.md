# Planet’Claim — mettre l’application en ligne avec une base sécurisée

Durée : environ 45 minutes, la première fois. Aucune compétence en programmation n’est nécessaire : il faut copier des valeurs et taper 5 commandes.

## Ce que vous obtenez

| Élément | Service (Google Firebase) | Sécurité |
|---|---|---|
| Le site `https://<votre-projet>.web.app` (ou votre propre domaine) | Firebase Hosting | HTTPS automatique, en-têtes de sécurité, pages non référencées sur Google |
| La base de données (dossiers, mails, compta…) | Cloud Firestore, hébergée **à Paris** (europe-west9) | Chiffrée, accessible uniquement aux comptes autorisés |
| Les pièces jointes (PDF, photos) | Cloud Storage, même région | Aucun lien public, lecture avec connexion uniquement, 25 Mo max |
| La connexion | Firebase Authentication | Compte Google ou e-mail + mot de passe, e-mail vérifié obligatoire |

**Les rôles** (définis par vous dans la page Administration) :
- `admin` : tout, y compris la gestion des accès ;
- `staff` : l’équipe Planet Aura, lecture et écriture des dossiers ;
- `cf` : Coste Fermon, accès en lecture à l’espace partagé seulement.

Quelqu’un qui n’est pas dans la liste ne voit rien, même s’il crée un compte : le blocage est fait par la base elle-même, pas seulement par l’écran.

**Coût** : le forfait « Blaze » (paiement à l’usage) est obligatoire pour stocker des fichiers, mais une petite équipe reste dans le gratuit (1 Go de base, 5 Go de fichiers, 50 000 lectures par jour). On ajoute une alerte budget à 5 € à l’étape 2.

---

## Étape 1 — Créer le projet Firebase (10 min)

1. Allez sur <https://console.firebase.google.com> avec le compte Google de Planet Aura.
2. **Ajouter un projet** → nom : `planet-claim` (Google ajoute parfois un suffixe : notez l’**identifiant du projet** affiché, ex. `planet-claim-4f2a1`).
3. Google Analytics : **désactivez-le** (inutile ici). Créez le projet.

## Étape 2 — Activer les services (10 min)

Dans le menu de gauche de la console Firebase :

1. **Passer au forfait Blaze** : en bas à gauche, *Mettre à niveau* → Blaze → ajoutez une carte. Puis dans <https://console.cloud.google.com/billing> → *Budgets et alertes* → créez un budget de **5 €** avec alerte e-mail.
2. **Authentication** → *Commencer* → onglet *Mode de connexion* :
   - activez **Google** (adresse d’assistance : votre e-mail) ;
   - activez **Adresse e-mail/Mot de passe** (laissez « lien e-mail » désactivé).
3. **Firestore Database** → *Créer une base de données* → emplacement **`europe-west9 (Paris)`** → *Démarrer en mode production*.
   ⚠️ L’emplacement ne peut plus être changé ensuite.
4. **Storage** → *Commencer* → même emplacement (Paris) → mode production.

## Étape 3 — Récupérer la configuration (5 min)

1. Roue dentée en haut à gauche → **Paramètres du projet** → section *Vos applications* → icône **`</>`** (Web).
2. Surnom : `planet-claim-web`. Ne cochez **pas** Firebase Hosting ici. *Enregistrer*.
3. Google affiche un bloc `const firebaseConfig = { apiKey: …, authDomain: …, … }`.
   Recopiez ces 6 valeurs dans le fichier **`public/firebase-config.js`** (à la place des `A_REMPLIR`).
   Ces valeurs ne sont pas secrètes : elles servent juste à trouver votre projet.
4. Remplacez `VOTRE-PROJET` par votre identifiant de projet dans **`.firebaserc`** et **`cors.json`**.

## Étape 4 — Vous déclarer administrateur (2 min)

Personne n’a accès tant que la liste est vide : il faut créer le premier administrateur à la main.

1. **Firestore Database** → *Données* → **+ Commencer une collection** → identifiant : `members`.
2. Identifiant du document : **votre e-mail en minuscules** (ex. `prenom.nom@planetaura.fr`).
3. Ajoutez deux champs de type *string* : `role` = `admin`, `name` = `Votre prénom`. *Enregistrer*.

Les autres personnes s’ajouteront ensuite depuis la page **Administration** de l’application.

## Étape 5 — Mettre en ligne (10 min)

Sur votre ordinateur :

1. Installez **Node.js** (version « LTS ») depuis <https://nodejs.org> puis ouvrez le *Terminal* (Mac) ou *PowerShell* (Windows).
2. Installez l’outil Firebase et connectez-vous :

```bash
npm install -g firebase-tools
```

```bash
firebase login
```

3. Placez-vous dans le dossier `suivi-sinistres` (téléchargé depuis GitHub : bouton *Code* → *Download ZIP*, puis décompressez) :

```bash
cd chemin/vers/suivi-sinistres
```

4. Envoyez le site **et les règles de sécurité** :

```bash
firebase deploy
```

La commande affiche l’adresse du site : `https://<votre-projet>.web.app`.

5. Autorisez la lecture des pièces jointes depuis le site (une seule fois). Dans la console Google Cloud, ouvrez **Cloud Shell** (icône `>_` en haut à droite de <https://console.cloud.google.com>), importez le fichier `cors.json` (menu ⋮ → *Importer*), puis :

```bash
gcloud storage buckets update gs://VOTRE-BUCKET --cors-file=cors.json
```

(`VOTRE-BUCKET` = la valeur `storageBucket` de l’étape 3.)

## Étape 6 — Importer vos données et inviter l’équipe (5 min)

1. Ouvrez `https://<votre-projet>.web.app/admin`, connectez-vous avec le compte déclaré à l’étape 4.
2. **Importer les dossiers** : choisissez le fichier `Suivi_des_sinistres.html` exporté depuis claude.ai → les 92 dossiers sont ajoutés.
3. **Accès** : ajoutez chaque collègue (rôle `staff`) et le contact Coste Fermon (rôle `cf`).
4. Envoyez-leur l’adresse du site. À la première connexion :
   - avec **Google** : rien d’autre à faire ;
   - avec **e-mail/mot de passe** : créez leur compte dans *Authentication → Utilisateurs → Ajouter un utilisateur*, communiquez le mot de passe provisoire, ils valident le lien de vérification reçu par e-mail puis changent leur mot de passe via « Mot de passe oublié ».

> Les données saisies depuis le lancement dans l’artifact claude.ai (au-delà des 92 dossiers d’origine) sont dans la base de claude.ai. Claude peut les extraire en un fichier de sauvegarde à restaurer avec **Restaurer** (page Administration). Les pièces jointes, elles, sont à ré-attacher ou à migrer séparément.

---

## Sécurité : à faire et à garder

- [ ] Activer la **validation en deux étapes** sur tous les comptes Google qui ont accès (et sur le compte propriétaire du projet Firebase).
- [ ] Dans *Authentication → Paramètres → Domaines autorisés*, ne garder que `localhost`, `<projet>.web.app`, `<projet>.firebaseapp.com` et votre domaine.
- [ ] **Sauvegarde** : bouton *Exporter la base* (page Administration) une fois par semaine ; rangez le fichier dans un Drive à accès restreint (il contient des données clients).
- [ ] Quand quelqu’un quitte l’équipe : *Retirer* dans Administration (accès coupé immédiatement), puis désactivez son compte dans *Authentication*.
- [ ] Ne jamais remettre dans le dépôt GitHub le fichier HTML d’origine ni une sauvegarde JSON (le `.gitignore` les bloque déjà).

## Votre propre adresse (optionnel)

*Hosting* → **Ajouter un domaine personnalisé** → ex. `sinistres.planetaura.fr` → ajoutez chez votre registrar (OVH, Gandi…) les enregistrements DNS indiqués. Le certificat HTTPS est automatique. Ajoutez ensuite ce domaine dans `cors.json` (puis relancez la commande de l’étape 5.5) et dans les *Domaines autorisés* d’Authentication.

## Mettre à jour l’application

Si vous faites évoluer l’artifact sur claude.ai : téléchargez le nouveau HTML, puis dans le dossier `suivi-sinistres` :

```bash
python3 scripts/build.py chemin/vers/Suivi_des_sinistres.html
```

```bash
firebase deploy --only hosting
```

Les données ne sont pas touchées : seule l’interface change.

## Ce qui fonctionne différemment hors de claude.ai

| Fonction | Sur claude.ai | Version hébergée |
|---|---|---|
| Envoi d’e-mail | « Envoyer via Gmail » | « Ouvrir dans ma messagerie » (votre logiciel de mail habituel) |
| Analyse IA des dossiers | Disponible | Masquée (peut être rebranchée sur l’API Claude via une Cloud Function) |
| Messages de Coste Fermon dans son espace | Commentaires claude.ai | Lien e-mail vers l’adresse de réponse configurée |

Tout le reste (dossiers, déclarations, pots, compta, balancier, guide, droits par utilisateur, exports CSV/Excel, partage Coste Fermon, journal) fonctionne à l’identique.

## Comment c’est construit (pour un développeur)

- `public/index.html` : l’application d’origine, générée par `scripts/build.py` (enveloppe claude.ai retirée, données embarquées vidées).
- `public/runtime.js` : réimplémente `window.claude.use('db' | 'assets' | 'user')` sur Firebase (SDK compat 10.14.1). Chaque document est stocké en JSON dans le champ `_j` (contourne les limites Firestore sur les tableaux imbriqués et `undefined`), `ts` est recopié pour les tris. Les liens `/_blob/<id>` sont interceptés et lus avec le jeton de l’utilisateur (aucune URL de téléchargement publique).
- `firestore.rules` / `storage.rules` : contrôle d’accès par rôle via `members/{email}`.
- `firebase.json` : hébergement + CSP stricte (seuls Google/Firebase, Google Fonts et cdnjs pour l’export Excel sont autorisés).
- Testé de bout en bout sur les émulateurs Firebase : connexion, rôles, import, écriture via l’interface, temps réel, fichiers, refus des accès anonymes, intrus, non vérifiés et tentatives d’élévation de droits.
