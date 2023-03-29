const { SlashCommandBuilder, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Membuat pesan embed')
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Judul pesan embed')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Deskripsi pesan embed')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('color')
        .setDescription('Warna pesan embed')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Kirim pesan embed ke channel yang dipilih')
        .setRequired(true)),

  async execute(interaction) {
    // Mendapatkan nilai dari opsi command
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const color = interaction.options.getString('color');
    const channel = interaction.options.getChannel('channel');

    // Memeriksa apakah pengguna memiliki izin untuk mengirim pesan ke channel yang dipilih
    if (!channel.permissionsFor(interaction.member).has(Permissions.FLAGS.SEND_MESSAGES)) {
      return interaction.reply({ content: 'Kamu tidak memiliki izin untuk mengirim pesan di channel yang dipilih.', ephemeral: true });
    }

    // Membuat pesan embed baru
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color);

    // Mengirim pesan embed ke channel yang dipilih
    channel.send({ embeds: [embed] });

    // Mengirim respon ke pengguna
    interaction.reply(`Pesan embed dengan judul "${title}" telah dikirim ke channel ${channel}.`);
  },
};
