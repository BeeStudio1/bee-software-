# 🐝 Bee Software

Un projet complet associant un bot Discord et une interface Electron.

## 📋 Structure du projet

```
bee-software-/
└── beesoft/
    ├── bot/               # Bot Discord
    │   └── bot.js
    ├── app/               # Application Electron
    │   ├── main.js
    │   ├── preload.js
    │   └── renderer/      # Interface utilisateur
    │       ├── app.js
    │       ├── index.html
    │       ├── themes/
    │       └── i18n/      # Traductions (AR, DE, FA, FR, HE, IT, JA, KO, NL, PT, TH, TR, ZH-CN)
    └── package.json
```

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/BeeStudio1/bee-software-.git
   cd bee-software-/beesoft
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Remplissez votre DISCORD_TOKEN dans .env
   ```

4. **Démarrer le projet**
   ```bash
   npm start
   ```

## 📦 Dépendances

- **discord.js** - Bot Discord
- **electron** - Application desktop
- **concurrently** - Exécution parallèle du bot et de l'app
- **dotenv** - Gestion des variables d'environnement

## 🌍 Langues supportées

- 🇸🇦 Arabe
- 🇩🇪 Allemand
- 🇮🇷 Persan
- 🇫🇷 Français
- 🇮🇱 Hébreu
- 🇮🇹 Italien
- 🇯🇵 Japonais
- 🇰🇷 Coréen
- 🇳🇱 Néerlandais
- 🇵🇹 Portugais
- 🇧🇷 Portugais (Brésil)
- 🇹🇭 Thaï
- 🇹🇷 Turc
- 🇨🇳 Chinois Simplifié

## 📄 Licence

Propriétaire BeeStudio1
