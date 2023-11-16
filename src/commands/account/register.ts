import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../models/command";
import { UserService } from "../../utilities/users/user_service";

export const Register: Command = {
    name: "register",
    description: "Register to join ToastyBets for this discord server.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

		await interaction.followUp({
            ephemeral: true,
			content: "Checking status of your account."
        });

		//Account registration
		UserService.registerUser(interaction);
    }
};
