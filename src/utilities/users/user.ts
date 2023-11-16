export interface User
{
	discordId: string,
	guildId: string,
	name: string,
	timezone: string,
	role: ROLE,
	balance: number,
	status: STATUS
}

export enum STATUS {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	BANNED = "BANNED",
	NEW_PLAYER = "NEW_PLAYER"
}


export enum ROLE {
	GUILD_MANAGER = "GUILD_MANAGER",
	PLAYER = "PLAYER",
	DEV = "DEV",
}
