import {ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";


const TIME_ZONE_MENU = new StringSelectMenuBuilder()
	.setCustomId("time_zone")
	.setPlaceholder("Select timezone...")
	.addOptions(
		new StringSelectMenuOptionBuilder()
			.setLabel("US: Eastern")
			.setDescription("Eastern Standard Time (UTC-5)")
			.setValue("us:eastern"),
		new StringSelectMenuOptionBuilder()
			.setLabel("US: Central")
			.setDescription("Central Standard Time (UTC-6)")
			.setValue("us:central"),
		new StringSelectMenuOptionBuilder()
			.setLabel("US: Mountain")
			.setDescription("Mountain Standard Time (UTC-7)")
			.setValue("us:mountain"),
		new StringSelectMenuOptionBuilder()
			.setLabel("US: Pacific")
			.setDescription("Pacific Standard Time (UTC-8)")
			.setValue("us:pacific"),
	);


const TIME_ZONE_ACTION_MENU = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(TIME_ZONE_MENU);

export const TimeZoneMenu = {
	TIME_ZONE_MENU: TIME_ZONE_MENU,
	TIME_ZONE_ACTION_MENU: TIME_ZONE_ACTION_MENU
};
