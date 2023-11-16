const mysql2 = require('mysql2/promise');
import { config } from "../../config"

export type GameResult = {
	game_id: string;
    home_team_id: number;
    away_team_id: number;
    home_score: number;
    away_score: number;
    game_status: string;
    game_time: string;
    home_odds: number;
    away_odds: number;
    week_number: number;
};

let queries = {
	testConnection: "SELECT VERSION()",
	// SELECT QUERIES
	getAllGames: "SELECT * FROM scores",
	getCurrentWeek: "SELECT * FROM scores WHERE week_number=?",
	getUserById: "SELECT * FROM users WHERE discord_id=?",
	getGuildUserById: "SELECT * FROM users WHERE discord_id=? AND guild_id=?",
	//INSERT QUERIES
	insertNewUser: "INSERT INTO users (discord_id, guild_id, name, timezone, role, balance, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
	//UPDATE QUERIES
}

let pool = mysql2.createPool(
	{
		connectionLimit: 5,
		host: config.HOST,
		user: config.USERNAME,
		password: config.PASSWORD,
		database: config.DATABASE
	}
);

async function execute<TQueryResult = any>(query: string, params: any[]): Promise<TQueryResult | undefined> {
	try {
		const [ rows ] = await pool.query(query, params)
		return rows;
	}
	catch(error: any) {
		console.log(`MYSQL(execute): ${query} : ${params.join(', ')} failed to execute with error: ${error.message}`);
		return undefined;
	}
}

export const mysql = {
	queries: queries,
	query: execute
};

