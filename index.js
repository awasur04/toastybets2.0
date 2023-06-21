// Include filesystem and path modules
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

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
	for (const file in commandFiles)
	{
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

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c =>
{
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

// Listener to interact with our commands
client.on(Events.InteractionCreate, async interaction =>
{
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandsName);

	if (!command)
	{
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try
	{
		await command.execute(interaction);
	}
	catch (error)
	{
		console.error(error);
		if (interaction.replied || interaction.deferred)
		{
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else
		{
			await interaction.reply({ content: 'There was an error while executing this command!', ephermal: true });
		}
	}
	console.log(interaction);
});