const mysql = require('mysql');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Créer une connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Fonction pour écrire des logs dans un fichier
async function saveLog(logData) {
  const logFilePath = path.join(__dirname, 'logs', 'model.log');
  try {
    await fs.mkdir(path.dirname(logFilePath), { recursive: true });
    await fs.appendFile(logFilePath, `${logData}\n`);
    console.log('Log saved successfully');
  } catch (error) {
    console.error('Error saving log:', error);
  }
}

// Connecter à la base de données MySQL
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to database:', err);
        saveLog(`Error connecting to database: ${err}`);
        reject(err);
      } else {
        console.log('Connected to database!');
        saveLog('Connected to database!');
        resolve();
      }
    });
  });
}

// Fonction pour sauvegarder un message dans la base de données
function saveMessage(content, author, channel) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO messages (content, author, channel) VALUES (?, ?, ?)', [content, author, channel], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  saveMessage,
  connectToDatabase,
  saveLog
};
