const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      // Check if there's already a reply
      const existingReply = interaction.deferred || interaction.replied;

      if (!existingReply) {
        // If there's no reply, defer the reply and execute the command
        await interaction.deferReply({ ephemeral: false });
        await command.execute(interaction, client);
      } else {
        // If there's already a reply, edit the existing reply
        await interaction.editReply("Command executed successfully.");
      }
    } catch (error) {
      console.error(error);
      // If there's no reply, reply with an error message
      if (!existingReply) {
        await interaction.reply({
          content: "Something went wrong while executing this command...",
          ephemeral: true,
        });
      } else {
        // If there's already a reply, edit the existing reply with an error message
        await interaction.editReply("Something went wrong while executing this command...");
      }
    }
  }
};
