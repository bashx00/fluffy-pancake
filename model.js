const mysql = require('mysql');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Créer une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, // Récupérer l'hôte MySQL depuis les variables d'environnement
  user: process.env.MYSQL_USER, // Récupérer l'utilisateur MySQL depuis les variables d'environnement
  password: process.env.MYSQL_PASSWORD, // Récupérer le mot de passe MySQL depuis les variables d'environnement
  database: process.env.MYSQL_DATABASE // Récupérer le nom de la base de données MySQL depuis les variables d'environnement
});

// Fonction pour écrire des logs dans un fichier
function saveLog(logData) {
  const logFilePath = path.join(__dirname, 'logs', 'model.log'); // Chemin du fichier de logs
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true }); // Créer le répertoire s'il n'existe pas
  }
  fs.appendFileSync(logFilePath, `${logData}\n`); // Écrire les logs dans le fichier
}

// Connecter à la base de données MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err); // Afficher l'erreur de connexion
    saveLog(`Error connecting to database: ${err}`); // Écrire l'erreur de connexion dans les logs
    return;
  }
  console.log('Connected to database!'); // Afficher un message de confirmation de connexion
  saveLog('Connected to database!'); // Écrire un message de confirmation de connexion dans les logs
});

// Fonction pour sauvegarder un message dans la base de données
function saveMessage(content, author, channel) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO messages (content, author, channel) VALUES (?, ?, ?)', [content, author, channel], (err, results) => {
      if (err) {
        reject(err); // Rejeter la promesse avec l'erreur si une erreur se produit
      } else {
        resolve(); // Résoudre la promesse si la sauvegarde est réussie
      }
    });
  });
}

module.exports = {
  saveMessage // Exporter la fonction de sauvegarde de message
};
