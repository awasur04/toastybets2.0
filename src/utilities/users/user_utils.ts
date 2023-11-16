import { CommandInteraction } from "discord.js";
import { User, STATUS, ROLE} from "./user";

enum AccountRegistrationStatus {
	NEW_USER,
	ALREADY_REGISTERED,
	BANNED,
	RETURNING_USER
}


function checkIfUserIsAbleToRegisterInGuild(currentUser: User): AccountRegistrationStatus {
	if (checkIfUserIsBannedInGuild(currentUser)) {
		return AccountRegistrationStatus.BANNED;
	}

	if (checkIfActiveInGuild(currentUser)) {
		return AccountRegistrationStatus.ALREADY_REGISTERED;
	}

	if (checkIfInactiveInGuild(currentUser)) {
		return AccountRegistrationStatus.RETURNING_USER;
	}

	return AccountRegistrationStatus.NEW_USER;
}

function checkIfUserIsBannedInGuild(user: User): boolean {
	if (user.status == STATUS.BANNED) {
		return true;
	}
	return false;
}

function checkIfActiveInGuild(user: User): boolean{
	if (user.status == STATUS.ACTIVE) {
		return true;
	}
	return false;
}

function checkIfInactiveInGuild(user: User): boolean {
	if (user.status == STATUS.INACTIVE) {
		return true;
	}
	return false;
}


function getUserModel(user: any): User {
	return { discordId: user.discord_id, guildId: user.guild_id, name: user.name, timezone: user.timezone, role: user.role, balance: user.balance, status: user.status };
}

// user is already in guild and active - false
// user is already in guild and inactive - true
// user is not in guild - true
// user is banned in guild - false

export const UserUtilities = {
	checkIfUserIsAbleToRegisterInGuild: checkIfUserIsAbleToRegisterInGuild,
	getUserModel: getUserModel,
	AccountRegistrationStatus: AccountRegistrationStatus
}
