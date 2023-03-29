const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping command'),
  async execute(interaction, client) {
    try {
      const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
        Date.now() - interaction.createdTimestamp
      }`;

      await interaction.reply({ content: newMessage });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Oops! Something went wrong while processing your command.'
      });
    }
  },
};
