import { ChannelType, Client, Guild } from "discord.js";

export default (client: Client): void =>
{
	client.on("guildCreate", async (guild: Guild) =>
	{
		if (!client.user || !client.application)
		{
			return;
		}

		guild.systemChannel?.send('I have joined the server!');
	});
};
