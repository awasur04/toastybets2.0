import { Client, GatewayIntentBits, Collection } from "discord.js";
import { config } from "./config"

//Event listeners
import ready from "./events/ready";
import interactionCreate from "./events/interactionCreate";
import guildCreate from "./events/guildCreate";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Define all the events
ready(client);
interactionCreate(client);
guildCreate(client);


// Log in to Discord with your client's token
client.login(config.TOKEN);
