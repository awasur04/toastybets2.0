// Include filesystem and path modules
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Create a new map to store all commands
client.commands = new Collection();

// Define the path our commands are stored in /commands/*
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// For each command sub folder in the /commands/ loop through each folder
for (const folder of commandFolders)
{
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// For each command file inside the current sub folder
	for (const file of commandFiles)
	{
		console.log(file);
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// Set a new item in the collection with the key as the command name and value as the exported module
		if ('data' in command && 'execute' in command)
		{
			client.commands.set(command.data.name, command);
		}
		else
		{
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles)
{
	console.log(file);
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once)
	{
		client.once(event.name, (...args) => event.execute(...args));
	}
	else
	{
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Log in to Discord with your client's token
client.login(token);