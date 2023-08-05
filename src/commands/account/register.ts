import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../models/command";

export const Register: Command = {
    name: "register",
    description: "Register to join ToastyBets for this discord server.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = 'You have joined!';

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
