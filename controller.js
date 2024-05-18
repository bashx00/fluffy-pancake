const Discord = require('discord.js');
const db = require('./model'); // Importer le modèle de base de données
const fs = require('fs').promises;
const path = require('path');

const client = new Discord.Client();

// Fonction pour écrire des logs dans un fichier
async function saveLog(logData) {
  const logFilePath = path.join(__dirname, 'logs', 'controller.log'); // Chemin du fichier de logs
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

// Fonction de sauvegarde d'un événement de bannissement dans les logs et la base de données
async function saveBanEvent(user, guild, reason = 'No reason provided') {
  await saveLog(`User ${user.tag} has been banned from ${guild.name}. Reason: ${reason}`);
  try {
    await db.saveModerationEvent('ban', user.id, guild.id, reason);
    console.log('Ban event saved to database');
  } catch (error) {
    console.error('Error saving ban event to database:', error);
    await saveLog(`Error saving ban event to database: ${error}`);
  }
}

// Fonction de sauvegarde d'un événement d'expulsion dans les logs et la base de données
async function saveKickEvent(user, guild) {
  const reason = 'No reason provided'; // Récupérer la raison de l'expulsion si disponible
  await saveLog(`User ${user.tag} has been kicked from ${guild.name}. Reason: ${reason}`);
  try {
    await db.saveModerationEvent('kick', user.id, guild.id, reason);
    console.log('Kick event saved to database');
  } catch (error) {
    console.error('Error saving kick event to database:', error);
    await saveLog(`Error saving kick event to database: ${error}`);
  }
}

// Fonction de sauvegarde d'un événement de mute dans les logs et la base de données
async function saveMuteEvent(user, guild) {
  const reason = 'No reason provided'; // Récupérer la raison du mute si disponible
  await saveLog(`User ${user.tag} has been muted in ${guild.name}. Reason: ${reason}`);
  try {
    await db.saveModerationEvent('mute', user.id, guild.id, reason);
    console.log('Mute event saved to database');
  } catch (error) {
    console.error('Error saving mute event to database:', error);
    await saveLog(`Error saving mute event to database: ${error}`);
  }
}

// Événement déclenché lorsqu'un utilisateur est banni
client.on('guildBanAdd', async (guild, user) => {
  console.log(`User ${user.tag} has been banned from ${guild.name}`);
  await saveBanEvent(user, guild);
});

// Événement déclenché lorsqu'un membre est expulsé
client.on('guildMemberRemove', async (member) => {
  if (member.kickable) {
    console.log(`User ${member.user.tag} has been kicked from ${member.guild.name}`);
    await saveKickEvent(member.user, member.guild);
  }
});

// Événement déclenché lorsqu'un membre est mis à jour
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    console.log(`User ${newMember.user.tag} has been muted in ${newMember.guild.name}`);
    await saveMuteEvent(newMember.user, newMember.guild);
  }
});

// Événement déclenché à chaque fois qu'un message est envoyé dans un salon
client.on('message', async (message) => {
  if (!message.guild) return; // Ignorer les messages qui ne proviennent pas de serveurs (par exemple, les messages privés)

  try {
    await db.saveMessage(message.content, message.author.id, message.channel.id);
    console.log('Message saved to database!'); // Afficher un message si la sauvegarde est réussie
    await saveLog(`Message saved to database! Content: ${message.content}, Author: ${message.author.id}, Channel: ${message.channel.id}`); // Écrire un message dans les logs si la sauvegarde est réussie
  } catch (err) {
    console.error('Error saving message:', err); // Afficher une erreur si la sauvegarde échoue
    await saveLog(`Error saving message: ${err}`); // Écrire l'erreur dans les logs si la sauvegarde échoue
  }
});

client.login(process.env.DISCORD_TOKEN); // Utilisation du token stocké dans une variable d'environnement

module.exports = client;