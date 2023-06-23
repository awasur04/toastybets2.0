const { Events } = require('discord.js');

// Send a welcome message when we join a new guild
// Eventually we will add the guilkd to database configure users
module.exports =
{
	name: Events.GuildCreate,
	execute(guild)
	{
		guild.systemChannel.send('I have joined the server!');
	},
};