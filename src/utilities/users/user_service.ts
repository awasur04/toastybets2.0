import { CommandInteraction } from "discord.js";
import { User, STATUS, ROLE } from "./user";
import { UserRegistration } from "./user_registration";
import { mysql } from "../database/query";

// getUserAccount
// Check if user id exists in database
// Input Params: discordID: string
// Returns: True = Account found, False = Account not found
function checkForUserAccount(accountId: string, guildId?: string): boolean {
	mysql.query(mysql.queries.getGuildUserById, [accountId, guildId]).then((foundUsers: any[]) => {
		if (foundUsers.length == 1) {
			return true;
		}
	}).catch((error) => {
		console.log("User Service: " + error);
	})
	return false;
}

function registerUser(interaction: CommandInteraction) {
	mysql.query(mysql.queries.getAnyUserById, [interaction.user.id]).then((foundUsers: any[]) => {
		if (foundUsers.length == 1) {
			//registerOldUserNewGuild();
		}
		else {
			UserRegistration.startNewUserRegistration(interaction);
		}
	}).catch((error) => {
		console.log("User Service: " + error);
	})
}

function createUser(interaction: CommandInteraction, timeZone: string) {
	let newUser: User = { discordId: interaction.user.id, guildId: interaction.guildId!, name: interaction.user.displayName, timezone: timeZone, role: ROLE.PLAYER, balance: 500, status: STATUS.ACTIVE };

	mysql.query(mysql.queries.insertNewUser, Object.values(newUser)).then(() => {
		console.log("Account created");
	}).catch((error) => {
		console.log("User Service: " + error);
	});
}

export const UserService = {
	checkForUserAccount: checkForUserAccount,
	registerUser: registerUser,
	createUser: createUser
}
