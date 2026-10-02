# Guide de Déploiement GitHub Pages & Résolution Erreur 404

Si vous voyez une **Erreur 404** sur GitHub Pages, pas de panique ! C'est tout à fait normal lors de la première configuration. Voici pourquoi et comment l'activer en 1 minute.

---

## 🎯 Les 2 Méthodes Disponibles (Choisissez celle qui vous convient)

### 👉 Méthode 1 : Via "Deploy from a branch" (/docs) — La plus rapide (Recommandée)
Le dossier `docs/` a été pré-compilé pour vous avec tous les fichiers HTML/CSS/JS et `.nojekyll`.

1. Rendez-vous sur votre dépôt GitHub :  
   **https://github.com/lynourou/Nourou_LY_fr_Portfolio_cv/settings/pages**
2. Dans la section **Build and deployment** :
   * **Source** : `Deploy from a branch`
   * **Branch** : Sélectionnez `main`
   * **Folder** : Sélectionnez `/docs` (au lieu de `/ (root)`)
3. Cliquez sur le bouton bleu **Save**.
4. Patientez 30 secondes. Votre site est disponible sur :  
   🌐 **https://lynourou.github.io/Nourou_LY_fr_Portfolio_cv/**

---

### 👉 Méthode 2 : Via "GitHub Actions" (Automatique à chaque git push)
Un workflow officiel `.github/workflows/deploy.yml` est déjà configuré dans le projet.

1. Rendez-vous sur :  
   **https://github.com/lynourou/Nourou_LY_fr_Portfolio_cv/settings/pages**
2. Dans la section **Build and deployment** :
   * **Source** : Changez pour sélectionner **« GitHub Actions »**
3. Rendez-vous ensuite dans l'onglet **Actions** en haut de votre dépôt :  
   **https://github.com/lynourou/Nourou_LY_fr_Portfolio_cv/actions**
4. Vous verrez le job **Déploiement GitHub Pages** s'exécuter.
5. Dès qu'il affiche un coche vert ✅ (environ 45 à 60 secondes), cliquez sur le lien généré pour ouvrir votre portfolio.

---

## 🔍 Pourquoi aviez-vous l'Erreur 404 ?
1. **GitHub Pages n'était pas encore activé** dans les *Settings* du dépôt.
2. Si vous aviez sélectionné `Deploy from a branch > main > / (root)`, GitHub cherchait du code compilé à la racine alors que les sources Vite brutes nécessitent d'être servies depuis `/docs` ou via *GitHub Actions*.
3. Les fichiers indispensables `.nojekyll` (qui empêche GitHub d'ignorer les assets) et `404.html` (qui permet le routage automatique sans page blanche) sont désormais inclus dans le projet.
