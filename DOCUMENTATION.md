# Documentation du Bot Discord de Traçabilité des Messages

Ce document fournit une documentation détaillée sur le fonctionnement, les fonctionnalités et l'utilisation du bot Discord de traçabilité des messages.

## Architecture du Projet

Le projet est organisé en trois parties principales :

1. **index.js :** Ce fichier contient le point d'entrée de l'application où le client Discord est initialisé et les événements sont écoutés.

2. **controller.js :** Ce fichier contient la logique de contrôle du bot, y compris la gestion des événements Discord et l'appel des fonctions du modèle.

3. **model.js :** Ce fichier contient les fonctions pour interagir avec la base de données MySQL, y compris la sauvegarde des messages et des événements de modération.

## Fonctionnalités

### Traçabilité des Messages

- Chaque message envoyé dans un salon Discord est enregistré dans la base de données avec les détails tels que le contenu, l'auteur et le salon.

### Gestion des Événements de Modération

- Les événements de modération tels que les bannissements, les expulsions et les mutes sont enregistrés dans les logs et la base de données.

## Configuration

Pour configurer et utiliser le bot Discord de traçabilité des messages, suivez les étapes décrites dans le fichier README.md.

## Développement Futur

- Ajouter des fonctionnalités avancées de modération telles que la détection automatique de comportement inapproprié.
- Améliorer la sécurité en implémentant des vérifications supplémentaires pour les commandes de modération.

## Contributions

Les contributions sont les bienvenues ! Pour contribuer, veuillez ouvrir une pull request expliquant les modifications proposées.

