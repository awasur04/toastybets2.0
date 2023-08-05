import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../models/command";

export const User: Command = {
    name: "user",
    description: "Provides information about the user.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = `This command was run by ${interaction.user.username}, who has been a user since ${interaction.user.createdAt}.`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
