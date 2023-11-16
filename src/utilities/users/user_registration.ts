import { ButtonInteraction, CacheType, CommandInteraction, ComponentType, DMChannel } from "discord.js";
import { UserService } from "./user_service";
import { Menus } from "../chat/menus/menu";
import { User } from "./user";


function startNewUserRegistration(interaction: CommandInteraction, currentUser: User) {
	if (currentUser.discordId != undefined && currentUser.guildId != undefined) {

		interaction.user.createDM().then(async (dmMessageChannel: DMChannel) => {
			dmMessageChannel.send({
				content: "Welcome to Toasty-Bets!\nYou are registering in the server: " + interaction.guild?.name,
			});

			dmMessageChannel.send({
				content: "Please select a timezone:",
				components: [ Menus.getTimeZoneMenu() ]
			});

			try {
				const timeZoneInteraction = dmMessageChannel.createMessageComponentCollector({
					componentType: ComponentType.StringSelect,
					time: (60000 * 5)
				})

				timeZoneInteraction.on('collect', async menuSelection => {
					currentUser.timezone = menuSelection.values[0];
					UserService.createUser(currentUser);
					await menuSelection.reply("You have successfully registered!");
				});
			}
			catch (e) {
				await dmMessageChannel.lastMessage?.edit({
					content: "Account registration timed-out, please try again."
				});
			}
		});
	}
	else {
		interaction.editReply("ERROR: Unable to register your account, please try again.");
	}
}

export const UserRegistration = {
	startNewUserRegistration: startNewUserRegistration
}
