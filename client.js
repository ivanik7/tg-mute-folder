import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import fs from "fs/promises";
import * as dotenv from 'dotenv';
dotenv.config();

let stringSession = new StringSession('');

try {
    const session = await fs.readFile('.session', { encoding: 'utf8' });
    stringSession = new StringSession(session);
} catch (error) {
    console.log("session file not fount");
}

const client = new TelegramClient(stringSession, parseInt(process.env.APP_ID), process.env.API_HASH, {
    connectionRetries: 5,
});

await client.connect();

export default client;

export async function saveSession () {
    await fs.writeFile('.session', client.session.save());
}

