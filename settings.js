// 각 상수들&상수변수 로드
import { config } from 'dotenv';

config();

export const discordToken = process.env.DISCORD_TOKEN;
export const clientId = process.env.CLIENT_ID;
export const guildId = process.env.GUILD_ID;
