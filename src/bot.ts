import { Client, GatewayIntentBits, Collection } from "discord.js";
import { config } from "./config";
import { mysql } from "./utilities/database/query";

//Event listeners
import ready from "./events/ready";
import interactionCreate from "./events/interactionCreate";
import guildCreate from "./events/guildCreate";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define all the events
ready(client);
interactionCreate(client);
guildCreate(client);


// Connect to database
mysql.query("SELECT VERSION()", []).then((status) => {
	if (status === undefined)
	{
		throw new Error("Database failed to connect. (Verify the database is online)");
	}

	console.log("Database: connection established!");
});


// Log in to Discord with your client's token
client.login(config.TOKEN);
