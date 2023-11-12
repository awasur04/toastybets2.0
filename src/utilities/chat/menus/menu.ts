import {ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuComponent } from "discord.js";

//Button List
import { TimeZoneMenu } from "./timezone_menu";

function getTimeZoneMenu(): ActionRowBuilder<StringSelectMenuBuilder> {
	return TimeZoneMenu.TIME_ZONE_ACTION_MENU;
}

export const Menus = {
	getTimeZoneMenu: getTimeZoneMenu
}
