# Guide de Déploiement GitHub Pages & Accès Espace Admin

Ce document récapitule la configuration du déploiement GitHub Pages et l'accès à votre **espace d'administration**.

---

## 🔐 Comment accéder à la page d'administration ?

La page d'administration est désormais déployée et accessible via plusieurs moyens directs :

1. **Bouton direct dans le menu de navigation (Navbar)** :
   - Sur votre site en direct, un bouton **« Admin »** avec une icône cadenas est présent dans la barre supérieure et dans le menu mobile.
2. **Lien dans le pied de page (Footer)** :
   - Cliquez sur **« Espace Administration »** tout en bas de la page.
3. **Accès direct par URL** :
   - **`https://lynourou.github.io/Nourou_LY_fr_Portfolio_cv/#admin`** *(Recommandé, fonctionne instantanément sur tous les hébergements statiques)*
   - **`https://lynourou.github.io/Nourou_LY_fr_Portfolio_cv/admin/`** *(Fichier `admin/index.html` compilé)*
   - **`https://lynourou.github.io/Nourou_LY_fr_Portfolio_cv/admin.html`** *(Fichier `admin.html` compilé)*
4. **Création de votre mot de passe administrateur** :
   - Aucun mot de passe prédéfini n'est imposé.
   - Lors de votre premier accès à l'espace admin, un écran dédié vous permet de **définir directement votre propre mot de passe personnel** (min. 6 caractères).
   - Vous pouvez également le modifier ou le réinitialiser à tout moment depuis l'onglet **Sécurité** de l'espace administration.

---

## 🎯 Les 2 Méthodes de Déploiement GitHub Pages

### 👉 Méthode 1 : Via "Deploy from a branch" (/docs) — La plus rapide
Le dossier `docs/` contient tous les fichiers HTML, CSS, JS générés, y compris `docs/admin/index.html` et `docs/admin.html`.

1. Rendez-vous sur votre dépôt GitHub :  
   **https://github.com/lynourou/Nourou_LY_fr_Portfolio_cv/settings/pages**
2. Dans la section **Build and deployment** :
   * **Source** : `Deploy from a branch`
   * **Branch** : Sélectionnez `main`
   * **Folder** : Sélectionnez `/docs` (au lieu de `/ (root)`)
3. Cliquez sur le bouton bleu **Save**.
4. Patientez 30 secondes. Votre site et sa page admin sont en ligne sur :  
   🌐 **https://lynourou.github.io/Nourou_LY_fr_Portfolio_cv/**

---

### 👉 Méthode 2 : Via "GitHub Actions" (Automatique à chaque git push)
Un workflow officiel `.github/workflows/deploy.yml` compile automatiquement l'ensemble (`index.html`, `admin/index.html`, `admin.html`, `dist/`).

1. Rendez-vous sur :  
   **https://github.com/lynourou/Nourou_LY_fr_Portfolio_cv/settings/pages**
2. Dans la section **Build and deployment** :
   * **Source** : Sélectionnez **« GitHub Actions »**
3. Rendez-vous ensuite dans l'onglet **Actions** de votre dépôt :  
   **https://github.com/lynourou/Nourou_LY_fr_Portfolio_cv/actions**
4. Dès qu'un push a lieu ou en déclenchant manuellement le workflow (« Run workflow »), GitHub déploie le site et la page admin.

---

## 🚀 Envoyer vos modifications vers GitHub (`git push`)

Depuis votre terminal local (après avoir téléchargé l'archive ZIP du portfolio) :

```bash
git add .
git commit -m "Mise a jour portfolio, photo et CV"
git push -u origin main
```

*(Si GitHub vous demande votre mot de passe, utilisez votre **Personal Access Token GitHub** avec les droits `repo`).*

---

## 📸 Comment rendre la Photo de profil et le CV visibles sur TOUS les appareils ?

Sur **GitHub Pages** (site statique), lorsque vous modifiez votre profil ou téléversez votre CV depuis votre téléphone ou un ordinateur, les données sont d'abord enregistrées dans le stockage de ce navigateur.

Pour que **tous les recruteurs et tous vos autres appareils** (smartphones, tablettes, autres PC) voient votre photo et votre CV :

### ✅ Méthode Recommandée (Définitive & Universelle) :
1. **Photo de profil** :
   - Placez votre photo nommée `photo.jpg` (ou `avatar.jpg`) dans le dossier `docs/` (ou `public/`).
   - Dans l'espace admin, indiquez simplement le chemin : `./photo.jpg`.
2. **Document CV** :
   - Placez votre document PDF sous le nom `cv.pdf` dans le dossier `docs/` (ou `public/`).
   - Dans l'espace admin (onglet CV), indiquez le chemin : `./cv.pdf`.
3. Poussez vers GitHub (`git push` ou glisser-déposer sur GitHub). Votre photo et votre CV s'afficheront instantanément sur n'importe quel appareil dans le monde entier !

### 🌐 Méthode Export Automatique depuis l'Espace Admin :
1. Dans votre espace administration, cliquez sur le bouton vert **« Publier pour tous les appareils »** dans la barre supérieure (ou dans l'onglet Sécurité & Sauvegardes).
2. Cliquez sur **« Télécharger portfolio-data.json »** (ce fichier contient votre photo, CV et tous vos textes modifiés).
3. Glissez simplement ce fichier `portfolio-data.json` dans le dossier `docs/` sur votre dépôt GitHub.
4. Le site charge automatiquement ce fichier sur tous les smartphones et ordinateurs !
