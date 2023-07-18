const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register to join ToastyBets for this discord server.'),
	async execute(interaction)
	{
		await interaction.reply('You have joined!');
	},
};
