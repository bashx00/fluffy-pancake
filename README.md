# Fluffy-Pancake

## Description

Ce bot Discord en Node.js sosu un modèle MVC permet de surveiller et de sauvegarder les messages ainsi que les événements de modération sur un serveur Discord. Il utilise une base de données MySQL pour stocker les données.

## Fonctionnalités

- **Traçabilité des Messages** : Enregistre chaque message envoyé dans un salon Discord dans la base de données.
- **Gestion des Événements de Modération** : Enregistre les bannissements, les expulsions et les mutes dans les logs et la base de données.
- **Sauvegarde Sécurisée** : Utilisation de variables d'environnement pour stocker les informations sensibles telles que les identifiants de connexion à la base de données et le token du bot Discord.

## Configuration

1. **Installation :** Clonez ce dépôt sur votre machine locale.
2. **Dépendances :** Exécutez `npm install` pour installer les dépendances nécessaires. [Comment installer NODE.js puis utiliser NPM](https://www.youtube.com/watch?v=bunBbhY4da4)
3. **Variables d'Environnement :** Configurez les variables d'environnement requises dans un fichier `.env.exemple` to `.env`.
4. **Token du Bot :** Obtenez un token pour votre bot Discord et configurez-le dans le fichier `.env`. [Comment trouver le TOKEN](https://www.youtube.com/watch?v=MdF9Hs7PcXk)


## Utilisation

1. **Invitation du Bot :** Invitez le bot sur votre serveur Discord en utilisant le lien d'invitation généré. [Comment faire un bot, etc...](https://www.youtube.com/watch?v=MdF9Hs7PcXk)
2. **Démarrage :** Exécutez `node index.js` pour démarrer le bot.

3. **Surveillance des Logs** : Les actions effectuées par le bot, telles que la sauvegarde des messages et les événements de modération, sont enregistrées dans les fichiers de logs spécifiés.

## Documentation

Consultez la documentation complète des fonctionnalités et des commandes du bot dans le fichier `DOCUMENTATION.md`.

## Auteurice

[Potite_Bulle](https://github.com/bashx00)


