const Discord = require('discord.js');
const db = require('./model'); // Importer le modèle de base de données
const fs = require('fs').promises;
const path = require('path');

const client = new Discord.Client();

// Fonction pour écrire des logs dans un fichier
async function saveLog(logData) {
  const logFilePath = path.join(__dirname, 'logs', 'controller.log');
  try {
    await fs.mkdir(path.dirname(logFilePath), { recursive: true });
    await fs.appendFile(logFilePath, `${logData}\n`);
    console.log('Log saved successfully');
  } catch (error) {
    console.error('Error saving log:', error);
  }
}

// Événement déclenché lorsque le bot est prêt
client.once('ready', async () => {
  console.log('Bot is ready!'); // Afficher un message lorsque le bot est prêt
  await saveLog('Bot is ready!'); // Écrire un message dans les logs lorsque le bot est prêt
});

// Événement déclenché à chaque fois qu'un message est envoyé dans un salon
client.on('message', async (message) => {
  if (!message.guild) return; // Ignorer les messages qui ne proviennent pas de serveurs (par exemple, les messages privés)

  try {
    // Appeler la fonction du modèle pour sauvegarder le message dans la base de données
    await db.saveMessage(message.content, message.author.id, message.channel.id);
    console.log('Message saved to database!'); // Afficher un message si la sauvegarde est réussie
    await saveLog(`Message saved to database! Content: ${message.content}, Author: ${message.author.id}, Channel: ${message.channel.id}`); // Écrire un message dans les logs si la sauvegarde est réussie
  } catch (error) {
    console.error('Error saving message:', error); // Afficher une erreur si la sauvegarde échoue
    await saveLog(`Error saving message: ${error}`); // Écrire l'erreur dans les logs si la sauvegarde échoue
  }
});

module.exports = client;
