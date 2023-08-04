import dotenv from 'dotenv';

dotenv.config();

type Config = {
	TOKEN: string,
	CLIENT_ID: string,
	HOST: string,
	PORT: string,
	USERNAME: string,
	PASSWORD: string,
	DATABASE: string
}

export let config: Config;

let status = process.env.STATUS;

if (status == 'dev')
{
	config = {
		TOKEN: process.env.TOKEN!,
		CLIENT_ID: process.env.CLIENT_ID!,
		HOST: process.env.DEV_HOST!,
		PORT: process.env.DEV_PORT!,
		USERNAME: process.env.DEV_USERNAME!,
		PASSWORD: process.env.DEV_PASSWORD!,
		DATABASE: process.env.DEV_DATABASE!
	}
} else {
	config = {
		TOKEN : process.env.TOKEN!,
		CLIENT_ID: process.env.CLIENT_ID!,
		HOST: process.env.HOST!,
		PORT: process.env.PORT!,
		USERNAME: process.env.USERNAME!,
		PASSWORD: process.env.PASSWORD!,
		DATABASE: process.env.DATABASE!
	}
}