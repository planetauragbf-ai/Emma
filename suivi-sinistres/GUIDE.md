# Planet’Claim — mise en ligne avec Supabase, GitHub et Netlify

Durée : environ 40 minutes la première fois. **Aucune installation sur votre ordinateur, aucune carte bancaire** : tout se fait dans le navigateur.

## Comment ça s’articule

```
 GitHub (le code)  ──mise à jour automatique──▶  Netlify (le site, HTTPS)
                                                    │
                                     connexion + données chiffrées
                                                    ▼
                                    Supabase, Paris (base + fichiers + comptes)
```

| Élément | Service | Sécurité |
|---|---|---|
| Code de l’application | GitHub (dépôt privé) | Ne contient aucune donnée client |
| Site `https://planet-claim.netlify.app` (ou votre domaine) | Netlify, gratuit | HTTPS automatique, en-têtes de sécurité stricts, non référencé sur Google |
| Base de données | Supabase PostgreSQL, **Paris** (eu-west-3) | Sécurité ligne à ligne : la base refuse elle-même tout accès non autorisé |
| Pièces jointes | Supabase Storage, compartiment **privé** | Aucun lien public, 25 Mo max ; Coste Fermon ne voit que les fichiers partagés |
| Comptes | Supabase Auth | Comptes créés uniquement par vous, e-mail confirmé obligatoire |

**Rôles** (page Administration) : `admin` (tout + accès) · `staff` (équipe, lecture/écriture) · `cf` (Coste Fermon, lecture de son espace).

**Coût** : 0 €. Offre gratuite Supabase : 500 Mo de base, 1 Go de fichiers. Deux limites à connaître :
- le projet se met **en pause après 7 jours sans aucune connexion** (il se réactive en un clic, sans perte de données) ;
- **pas de sauvegarde automatique** : faites l’export hebdomadaire (étape 7). L’offre Pro (25 $/mois) ajoute sauvegardes quotidiennes et supprime la pause, à envisager quand l’outil sera central.

---

## Étape 1 — Créer le projet Supabase (5 min)

1. Allez sur <https://supabase.com> → **Start your project** → connectez-vous **avec GitHub** (un compte de moins à gérer).
2. **New project** :
   - Name : `planet-claim`
   - Database Password : cliquez *Generate a password* et **rangez-le dans votre gestionnaire de mots de passe**
   - Region : **West EU (Paris)**
   - Plan : Free
3. Patientez 2 minutes que le projet soit prêt.

## Étape 2 — Créer la base et ses règles de sécurité (3 min)

1. Menu de gauche → **SQL Editor** → **New query**.
2. Ouvrez le fichier [`supabase/schema.sql`](supabase/schema.sql) sur GitHub, bouton *Copy raw file*, collez dans l’éditeur.
3. **Run**. Le message attendu : *Success. No rows returned*.

Le script crée les tables, les règles d’accès par rôle, le temps réel et le compartiment privé des pièces jointes. Vous pouvez le relancer sans risque.

## Étape 3 — Régler la connexion (5 min)

Menu **Authentication** :

1. **Sign In / Providers** (ou *Providers*) → **Email** : laissez activé, vérifiez que **Confirm email** est coché, mettez *Minimum password length* à **10**.
2. Même page, réglages généraux : **décochez « Allow new users to sign up »**. Plus personne ne peut se créer un compte seul : c’est vous qui créez les accès.
3. **URL Configuration** : vous y reviendrez à l’étape 5, une fois l’adresse du site connue.

## Étape 4 — Brancher l’application sur votre base (3 min)

1. Supabase → bouton **Connect** en haut (ou *Project Settings → API*) : copiez **Project URL** et la clé **anon public** (parfois appelée *publishable*).
   ⚠️ Ne copiez jamais la clé **service_role / secret** : elle contourne toutes les protections.
2. Sur GitHub, ouvrez `suivi-sinistres/public/supabase-config.js` → icône crayon ✏️ → remplacez les deux `A_REMPLIR` → **Commit changes**.

## Étape 5 — Mettre le site en ligne avec Netlify (5 min)

1. <https://app.netlify.com> → connectez-vous **avec GitHub**.
2. **Add new site → Import an existing project → GitHub** → autorisez Netlify à accéder au dépôt `Emma` (uniquement celui-là).
3. Réglages :
   - Branch to deploy : la branche qui contient l’application (`main` une fois fusionnée)
   - **Base directory : `suivi-sinistres`**
   - Build command : *(vide)* · Publish directory : `suivi-sinistres/public` (pré-rempli par `netlify.toml`)
4. **Deploy**. Puis *Site configuration → Change site name* → `planet-claim` → adresse : `https://planet-claim.netlify.app`.
5. Retour dans Supabase → **Authentication → URL Configuration** :
   - Site URL : `https://planet-claim.netlify.app`
   - Redirect URLs : ajoutez `https://planet-claim.netlify.app/**`

Désormais, **chaque modification enregistrée sur GitHub met le site à jour automatiquement** en moins d’une minute.

## Étape 6 — Créer votre accès administrateur (3 min)

1. Supabase → **Authentication → Users → Add user → Create new user** : votre e-mail, un mot de passe provisoire, cochez **Auto Confirm User**.
2. **SQL Editor → New query**, collez en remplaçant l’e-mail et le prénom, puis **Run** :

```sql
insert into public.members (email, role, name) values (lower('prenom.nom@planetaura.fr'), 'admin', 'Prénom');
```

3. Ouvrez `https://planet-claim.netlify.app`, connectez-vous, puis changez le mot de passe avec le bouton **Mot de passe** en bas à gauche.

## Étape 7 — Importer les dossiers et inviter l’équipe (10 min)

1. Ouvrez `https://planet-claim.netlify.app/admin`.
2. **Importer les dossiers** → choisissez le fichier `Suivi_des_sinistres.html` exporté depuis claude.ai → les 92 dossiers sont ajoutés (ceux déjà présents ne sont jamais écrasés).
3. Pour **chaque personne** (collègue ou contact Coste Fermon) :
   1. Supabase → *Authentication → Users → Add user → Create new user* (e-mail, mot de passe provisoire, **Auto Confirm User** coché) ;
   2. page Administration → **Accès** → e-mail + nom + rôle (`staff` ou `cf`) → *Ajouter* ;
   3. envoyez-lui l’adresse du site et le mot de passe provisoire **par deux canaux différents** (ex. e-mail + SMS). Il le change au premier usage via le bouton **Mot de passe**.
4. **Sauvegarde** : bouton *Exporter la base* chaque semaine, fichier rangé dans un Drive à accès restreint (il contient des données clients).

> Les données saisies dans l’artifact claude.ai après sa création (au-delà des 92 dossiers d’origine) sont dans la base de claude.ai. Claude peut les extraire en un fichier de sauvegarde à restaurer avec **Restaurer** (page Administration). Les pièces jointes sont à ré-attacher ou à migrer séparément.

---

## Sécurité : la liste à cocher

- [ ] **Double authentification** activée sur votre compte GitHub (*Settings → Password and authentication*) : il donne accès à Supabase et Netlify.
- [ ] Dépôt GitHub en **privé** (*Settings → General → Danger Zone → Change visibility*).
- [ ] « Allow new users to sign up » **désactivé** (étape 3.2).
- [ ] Clé `service_role` jamais copiée nulle part.
- [ ] Départ d’une personne : *Retirer* dans Administration (accès coupé immédiatement) **et** suppression du compte dans *Authentication → Users*.
- [ ] Export hebdomadaire de la base.
- [ ] Ne jamais déposer sur GitHub le fichier HTML d’origine ni une sauvegarde JSON (le `.gitignore` les bloque déjà).

## Options

**Connexion « Se connecter avec Google »** (pratique si l’équipe utilise Gmail/Google Workspace) : Supabase → *Authentication → Providers → Google* suit un pas-à-pas qui demande de créer un « identifiant OAuth » dans <https://console.cloud.google.com> (≈ 10 min). Les personnes doivent quand même avoir été créées (étape 7.3.1) : Google ne sert qu’à se connecter sans mot de passe.

**« Mot de passe oublié » par e-mail** : l’envoi d’e-mails intégré à Supabase est très limité (quelques e-mails par heure). Pour un usage fiable, branchez un service d’envoi gratuit (Brevo, Resend…) dans *Authentication → Emails → SMTP Settings*. Sinon, vous pouvez toujours redéfinir un mot de passe depuis *Authentication → Users*.

**Votre propre adresse** (`sinistres.planetaura.fr`) : Netlify → *Domain management → Add a domain*, ajoutez l’enregistrement DNS indiqué chez votre registrar ; HTTPS automatique. Ajoutez ensuite la nouvelle adresse dans Supabase → *URL Configuration*.

## Faire évoluer l’application

Si vous modifiez l’artifact sur claude.ai : demandez à Claude de régénérer `public/index.html` à partir du nouveau fichier HTML (script `scripts/build.py`) et de l’enregistrer sur GitHub. Netlify publie la nouvelle version tout seul ; les données ne sont pas touchées.

## Ce qui fonctionne différemment hors de claude.ai

| Fonction | Sur claude.ai | Version hébergée |
|---|---|---|
| Envoi d’e-mail | « Envoyer via Gmail » | « Ouvrir dans ma messagerie » |
| Analyse IA des dossiers | Disponible | Masquée (rebranchable sur l’API Claude via une Edge Function Supabase) |
| Messages de Coste Fermon dans son espace | Commentaires claude.ai | Lien e-mail vers l’adresse de réponse configurée |

Tout le reste fonctionne à l’identique, **y compris le temps réel** : une modification faite par un collègue apparaît chez les autres sans recharger la page.

## Pour un développeur

- `public/index.html` : application d’origine générée par `scripts/build.py` (enveloppe claude.ai retirée, données embarquées vidées).
- `public/runtime.js` : réimplémente `window.claude.use('db' | 'assets' | 'user')` sur supabase-js 2.45.4 (copie locale dans `public/vendor/`). L’API Firestore-like de l’app (`collection/doc/get/set/delete/onSnapshot/orderBy/limit`) est servie par la table `docs (col, id, data jsonb)` avec cache local, application immédiate des écritures et un canal Realtime unique (resynchronisation à la reconnexion). Les liens `/_blob/<id>` sont interceptés et téléchargés avec le jeton de l’utilisateur.
- `supabase/schema.sql` : tables, fonctions `my_role()/is_staff()/is_admin()/cf_can_read()`, politiques RLS (tables + storage), publication Realtime. Idempotent.
- `public/_headers` : CSP stricte (uniquement le site, `*.supabase.co`, Google Fonts et cdnjs pour l’export Excel), lue par Netlify ou Cloudflare Pages.
- Testé de bout en bout sur la pile Supabase locale (26 contrôles) : import, ré-import sans écrasement, export, modification via l’interface, temps réel entre deux sessions (mise à jour et suppression), tri/limite, fichiers, cloisonnement Coste Fermon (dossiers et fichiers), élévation de droits refusée, compte non inscrit, e-mail non confirmé et accès anonyme refusés.
