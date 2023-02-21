import { Api } from "telegram";
import client from "./client.js";
import parseDate from "./parseDate.js";

const [folderName, muteUntilStr] = process.argv.slice(2);

const muteUntil = parseDate(muteUntilStr);

console.log(`Muting ${folderName} until ${muteUntil.toSQL()}`);

const muteUntilTs = muteUntil.toUnixInteger();

const peers = await client.invoke(new Api.messages.GetDialogFilters())

const kek = peers.filter(e => e.title == folderName)[0].includePeers;

for (const k of kek) {
    const l = await client.invoke(new Api.account.GetNotifySettings({
        peer: k,
    }));

    if (l.muteUntil < muteUntilTs) {
        await client.invoke(new Api.account.UpdateNotifySettings({
            peer: k,
            settings: new Api.InputPeerNotifySettings({
                muteUntil: muteUntilTs,
            }),
        }));
    }
}

await client.disconnect();
await client.destroy();
