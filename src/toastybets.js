const config = require('./config.json');
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

/**
 * Define the intents that are going to be used by the bot
 * Reference: https://discord.com/developers/docs/topics/gateway
 * Create discord client with the defined intents
 */
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds
	],
});

/**
 * initialize: Connect the bot application to discord and register events / commands
 */
function initialize()
{
	client.login(config.token);
	registerEvents();
}

/**
 * registerEvents: Register all event files located in src/events folder
 */
function registerEvents()
{
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

	for (const file of eventFiles)
	{
		const event = require(`./events/${file}`);
		if (event.once)
		{
			client.once(event.name, (...args) => event.execute(...args));
		}
		else
		{
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

initialize();