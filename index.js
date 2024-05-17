const Discord = require('discord.js');
const client = require('./controller');

client.once('ready', () => {
  console.log('Bot is ready!');
  monitorModerationEvents();
});

function monitorModerationEvents() {
  client.on('guildBanAdd', handleBan);
  client.on('guildMemberRemove', handleKick);
  client.on('guildMemberUpdate', handleMute);
}

function handleBan(guild, user) {
  const reason = 'No reason provided';
  logEvent(`User ${user.tag} has been banned from ${guild.name}. Reason: ${reason}`);
  saveToDatabase('ban', user.id, guild.id, reason);
}

function handleKick(member) {
  if (member.kickable) {
    logEvent(`User ${member.user.tag} has been kicked from ${member.guild.name}`);
    saveToDatabase('kick', member.user.id, member.guild.id, 'No reason provided');
  }
}

function handleMute(oldMember, newMember) {
  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    logEvent(`User ${newMember.user.tag} has been muted in ${newMember.guild.name}`);
    saveToDatabase('mute', newMember.user.id, newMember.guild.id, 'No reason provided');
  }
}

function logEvent(logData) {
  console.log(logData);
}

function saveToDatabase(action, userId, guildId, reason) {
  // Logique pour sauvegarder dans la base de données
}

client.login(process.env.DISCORD_TOKEN);