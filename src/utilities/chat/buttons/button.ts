import {ActionRowBuilder, ButtonBuilder } from "discord.js";

//Button List
import { TimeZoneButton } from "./timezone_button";

function getTimeZoneButtons(): ActionRowBuilder<ButtonBuilder> {
	return TimeZoneButton.TIME_ZONE_BUTTONS;
}

export const Buttons = {
	getTimeZoneButtons: getTimeZoneButtons
}
