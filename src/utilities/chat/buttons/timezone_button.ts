import {ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

const PACIFIC_TIME_BUTTON = new ButtonBuilder()
	.setCustomId('PST')
	.setLabel('US: Pacific')
	.setStyle(ButtonStyle.Primary);

const MOUNTAIN_TIME_BUTTON = new ButtonBuilder()
	.setCustomId('MST')
	.setLabel('US: Mountain')
	.setStyle(ButtonStyle.Primary);

const CENTRAL_TIME_BUTTON = new ButtonBuilder()
	.setCustomId('CST')
	.setLabel('US: Central')
	.setStyle(ButtonStyle.Primary);

const EASTERN_TIME_BUTTON = new ButtonBuilder()
	.setCustomId('EST')
	.setLabel('US: Eastern')
	.setStyle(ButtonStyle.Primary);

const TIME_ZONE_BUTTONS = new ActionRowBuilder<ButtonBuilder>().addComponents(PACIFIC_TIME_BUTTON, MOUNTAIN_TIME_BUTTON, CENTRAL_TIME_BUTTON, EASTERN_TIME_BUTTON);

export const TimeZoneButton = {
	PACIFIC_TIME_BUTTON: PACIFIC_TIME_BUTTON,
	MOUNTAIN_TIME_BUTTON: MOUNTAIN_TIME_BUTTON,
	CENTRAL_TIME_BUTTON: CENTRAL_TIME_BUTTON,
	EASTERN_TIME_BUTTON: EASTERN_TIME_BUTTON,
	TIME_ZONE_BUTTONS: TIME_ZONE_BUTTONS
};
