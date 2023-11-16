import { CommandInteraction } from "discord.js";
import { User, STATUS, ROLE } from "./user";
import { UserRegistration } from "./user_registration";
import { mysql } from "../database/query";
import { UserUtilities } from "./user_utils";

// getUserAccount
// Check if user id exists in database
// Input Params: discordID: string
// Returns: True = Account found, False = Account not found
function registerUser(interaction: CommandInteraction) {
	mysql.query(mysql.queries.getGuildUserById, [interaction.user.id, interaction.guild!.id]).then((foundUser: any) => {
		let currentUser: User;
		if (foundUser[0] != undefined) {
			currentUser = UserUtilities.getUserModel(foundUser[0]);
		}
		else {
			currentUser = { discordId: interaction.user.id, guildId: interaction.guild!.id, name: interaction.user.displayName, timezone: "us:central", role: ROLE.PLAYER, balance: 500, status: STATUS.NEW_PLAYER };
		}

		console.log(currentUser);

		let isUserAbleToRegister = UserUtilities.checkIfUserIsAbleToRegisterInGuild(currentUser);

		switch(isUserAbleToRegister) {
			case UserUtilities.AccountRegistrationStatus.NEW_USER:
				UserRegistration.startNewUserRegistration(interaction, currentUser);
				interaction.editReply("Please check your dms for registration.");
				break;
			case UserUtilities.AccountRegistrationStatus.ALREADY_REGISTERED:
				interaction.editReply("You are already registered to play on this server.");
				break;
			case UserUtilities.AccountRegistrationStatus.BANNED:
				interaction.editReply("You have been banned from playing on this server (get rekt)");
				break;
			case UserUtilities.AccountRegistrationStatus.RETURNING_USER:
				//activate profile
				interaction.editReply("Please check your dms to reactivate your account.");
				break;
		}
	}).catch((error) => {
		console.log("User Service: " + error);
		interaction.editReply("There was an issue trying to register, please try again.");
	});
}

function createUser(currentUser: User) {
	currentUser.status = STATUS.ACTIVE;
	mysql.query(mysql.queries.insertNewUser, Object.values(currentUser)).then(() => {
	}).catch((error) => {
		console.log("User Service: " + error);
	});
}

export const UserService = {
	registerUser: registerUser,
	createUser: createUser
}
