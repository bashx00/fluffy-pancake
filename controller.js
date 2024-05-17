const Discord = require('discord.js');
const db = require('./model'); // Importer le modèle de base de données
const fs = require('fs');
const path = require('path');

const client = new Discord.Client();

// Fonction pour écrire des logs dans un fichier
function saveLog(logData) {
  const logFilePath = path.join(__dirname, 'logs', 'controller.log'); // Chemin du fichier de logs
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true }); // Créer le répertoire s'il n'existe pas
  }
  fs.appendFileSync(logFilePath, `${logData}\n`); // Écrire les logs dans le fichier
}

// Événement déclenché lorsque le bot est prêt
client.once('ready', () => {
  console.log('Bot is ready!'); // Afficher un message lorsque le bot est prêt
  saveLog('Bot is ready!'); // Écrire un message dans les logs lorsque le bot est prêt
});

// Événement déclenché à chaque fois qu'un message est envoyé dans un salon
client.on('message', message => {
  if (!message.guild) return; // Ignorer les messages qui ne proviennent pas de serveurs (par exemple, les messages privés)

  // Appeler la fonction du modèle pour sauvegarder le message dans la base de données
  db.saveMessage(message.content, message.author.id, message.channel.id)
    .then(() => {
      console.log('Message saved to database!'); // Afficher un message si la sauvegarde est réussie
      saveLog(`Message saved to database! Content: ${message.content}, Author: ${message.author.id}, Channel: ${message.channel.id}`); // Écrire un message dans les logs si la sauvegarde est réussie
    })
    .catch(err => {
      console.error('Error saving message:', err); // Afficher une erreur si la sauvegarde échoue
      saveLog(`Error saving message: ${err}`); // Écrire l'erreur dans les logs si la sauvegarde échoue
    });
});

module.exports = client;
