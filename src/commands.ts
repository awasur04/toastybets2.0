// Base Model for Command Interface
import { Command } from "./commands/models/command";

// Utility Commands
import { User } from "./commands/utility/user";
import { Server } from "./commands/utility/server";

// Account Commands
import { Register } from "./commands/account/register";

export const Commands: Command[] = [
	User,
	Server,
	Register
];
