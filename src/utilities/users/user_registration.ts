import { ButtonInteraction, CacheType, CommandInteraction, ComponentType, DMChannel } from "discord.js";
import { UserService } from "./user_service";
import { Menus } from "../chat/menus/menu";


function startNewUserRegistration(interaction: CommandInteraction) {
	let accountId = interaction.user.id;
	let guildId = interaction.guild?.id;

	if (accountId != undefined && guildId != undefined) {

		interaction.user.createDM().then(async (dmMessageChannel: DMChannel) => {
			dmMessageChannel.send({
				content: "You are currently registering for Toasty-Bets in the server: " + interaction.guild?.name,
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
					let timeZoneSelection = menuSelection.values[0];
					await menuSelection.reply("You have selected: " + timeZoneSelection)

					UserService.createUser(interaction, timeZoneSelection);
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
