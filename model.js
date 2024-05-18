// Importation de la bibliothèque MySQL
const mysql = require('mysql');

// Importation de la bibliothèque de gestion de fichiers
const fs = require('fs').promises;

// Importation du module path
const path = require('path');

// Importation du module dotenv pour charger les variables d'environnement depuis un fichier .env
require('dotenv').config();

// Création d'une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, // Hôte MySQL
  user: process.env.MYSQL_USER, // Nom d'utilisateur MySQL
  password: process.env.MYSQL_PASSWORD, // Mot de passe MySQL
  database: process.env.MYSQL_DATABASE // Nom de la base de données MySQL
});

// Fonction asynchrone pour sauvegarder des logs dans un fichier
async function saveLog(logData) {
  // Chemin du fichier de logs
  const logFilePath = path.join(__dirname, 'logs', 'model.log');
  try {
    // Création du répertoire s'il n'existe pas
    await fs.mkdir(path.dirname(logFilePath), { recursive: true });
    // Ajout du log dans le fichier
    await fs.appendFile(logFilePath, `${logData}\n`);
    console.log('Log saved successfully'); // Affichage d'un message si le log est sauvegardé avec succès
  } catch (error) {
    console.error('Error saving log:', error); // Affichage d'une erreur en cas d'échec de sauvegarde du log
  }
}

// Connexion à la base de données MySQL
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    // Tentative de connexion à la base de données
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to database:', err); // Affichage de l'erreur en cas d'échec de connexion
        saveLog(`Error connecting to database: ${err}`); // Sauvegarde de l'erreur dans les logs
        reject(err);
      } else {
        console.log('Connected to database!'); // Affichage d'un message si la connexion est réussie
        saveLog('Connected to database!'); // Sauvegarde de la connexion réussie dans les logs
        resolve();
      }
    });
  });
}

// Fonction pour sauvegarder un message dans la base de données
function saveMessage(content, author, channel) {
  return new Promise((resolve, reject) => {
    // Insertion du message dans la table 'messages'
    connection.query('INSERT INTO messages (content, author, channel) VALUES (?, ?, ?)', [content, author, channel], (err, results) => {
      if (err) {
        reject(err); // Rejet de la promesse en cas d'erreur lors de l'insertion
      } else {
        resolve(); // Résolution de la promesse si l'insertion est réussie
      }
    });
  });
}

// Exportation des fonctions pour les rendre accessibles depuis d'autres fichiers
module.exports = {
  saveMessage,
  connectToDatabase,
  saveLog
};
