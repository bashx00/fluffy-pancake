require('dotenv').config();
const client = require('./controller');

// Fonction pour enregistrer les logs dans un fichier
function saveLog(logData) {
  const logFilePath = 'logs/bot.log';
  fs.appendFileSync(logFilePath, `${logData}\n`);
}

client.login(process.env.DISCORD_TOKEN);

// Log lorsque le bot se déconnecte
client.on('disconnect', () => {
  console.log('Bot disconnected!');
  saveLog('Bot disconnected!');
});

// Log lorsqu'une erreur se produit
client.on('error', error => {
  console.error('Bot encountered an error:', error);
  saveLog(`Bot encountered an error: ${error}`);
});
