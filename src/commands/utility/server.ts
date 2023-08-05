import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../models/command";

export const Server: Command = {
    name: "server",
    description: "Provides information about the server.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
