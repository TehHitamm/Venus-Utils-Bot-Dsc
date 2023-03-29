const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = async (client) => {
  try {
    let commandArray = [];

    const commandsFolders = fs.readdirSync("./src/commands");
    for (const folder of commandsFolders) {
      const commandsFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands } = client;
      for (const file of commandsFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Command: ${command.data.name} has been passed through the handler`);
      }
    }

    const clientId = "1087227423361335326";
    const guildId = "969725465503858769";
    const rest = new REST({ version: "9" }).setToken("MTA4NzIyNzQyMzM2MTMzNTMyNg.GIVrwz.65hkcE8ALVcPGKjOCall6t01Cp2p-_rhGsHT-s");

    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandArray });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
 