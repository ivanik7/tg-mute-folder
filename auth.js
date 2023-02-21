import { Api } from "telegram";
import input from "input";
import client, {saveSession} from "./client.js";

await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () => await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
});

await saveSession()
