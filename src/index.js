require("dotenv").config();
const token = "MTA4NzIyNzQyMzM2MTMzNTMyNg.GIVrwz.65hkcE8ALVcPGKjOCall6t01Cp2p-_rhGsHT-s"
const { Client, Collection, GatewayIntentBits, Intents } = require("discord.js");
const fs = require("fs");
const handleEvents = require("./functions/handlers/handleEvents");
const handleCommands = require("./functions/handlers/handleCommands");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
client.commandArray = [];

// tambahkan handleEvents ke dalam client
client.handleEvents = () => handleEvents(client);
client.handleCommands = () => handleCommands(client);

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionsFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionsFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// panggil handleEvents
client.handleEvents();
client.handleCommands();
client.login(token);
