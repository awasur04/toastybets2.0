// Require the necessary discord.js classes
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
// Include filesystem and path modules
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders)
{
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJson() output of each commands data for deployment
	for (const file of commandFiles)
	{
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command)
		{
			commands.push(command.data.toJSON());
		}
		else
		{
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Finally deploy your commands to discord
(async () =>
{
	try
	{
		console.log(`Start refreshing ${commands.length} application (/) commands.`);

		// Put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error)
	{
		console.error(error);
	}
})();