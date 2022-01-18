const config = require('./config.json');
const { Client, Intents } = require('discord.js');
const intents = new Intents();
intents.add(
	"GUILDS",
	"GUILD_MESSAGES",
	"GUILD_MESSAGE_REACTIONS",
	"DIRECT_MESSAGES",
	"DIRECT_MESSAGE_REACTIONS"
);

/**
 * Create discord client with the defined intents
 */
const client = new Client({ intents: intents });

/**
 * initialize: Connect the bot application to discord and register events / commands
 */
function initialize()
{
	client.login(config.token);
}
initialize();