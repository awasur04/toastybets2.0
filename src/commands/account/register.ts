import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../models/command";
import { UserService } from "../../utilities/users/user_service";

export const Register: Command = {
    name: "register",
    description: "Register to join ToastyBets for this discord server.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
		let content = "";
		if (UserService.checkForUserAccount(interaction.user.id, interaction.guild?.id)) {
			content = "Your account is already registered to play in this server.";
		}
		else {
			//Account registration
			UserService.registerUser(interaction);
			content = "Please check your DMs to complete registration.";
		}
        await interaction.followUp({
            ephemeral: true,
			content
        });
    }
};
