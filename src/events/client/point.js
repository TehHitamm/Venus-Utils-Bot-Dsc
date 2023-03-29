const { Client, Collection, Intents, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("message", (msg) => {
  if (msg.content === "!topup") {
    const exampleEmbed = new Discord.MessageEmbed()
      .setTitle("Top up Point 💰")
      .setDescription("Top up point ingame")
      .addField(
        "Mau beli rank?",
        "Ayo klik tombol dibawah untuk mengisi pointmu!"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/998570252948484199/1090219666288427089/VENUS_1.png"
      )
      .setColor("#008000")
      .setTimestamp();

    const button = new Discord.MessageButton()
      .setStyle("SUCCESS")
      .setLabel("Beli")
      .setCustomId("buy_button")
      .setEmoji("💸");

    const row = new Discord.MessageActionRow().addComponents(button);

    msg.channel
      .send({ embeds: [exampleEmbed], components: [row] })
      .then((message) => {
        const filter = (interaction) => {
          return (
            interaction.customId === "buy_button" &&
            interaction.user.id === msg.author.id
          );
        };

        const collector = message.createMessageComponentCollector({
          filter,
          time: 15000,
        });

        collector.on("collect", (interaction) => {
          const ticketEmbed = new Discord.MessageEmbed()
            .setTitle("Gunakan /format")
            .setDescription("Gunakan /format untuk mengisi format top up mu.")
            .addField(
              "contoh /format",
              "(nama) TehHitamm\n(jumlah point) 75\n(payment) gopay"
            )
            .setColor("#008000")
            .setTimestamp();

          const closeButton = new Discord.MessageButton()
            .setStyle("DANGER")
            .setLabel("Tutup")
            .setCustomId("close_button")
            .setEmoji("🔒");

          const row2 = new Discord.MessageActionRow().addComponents(
            closeButton
          );

          interaction.update({ embeds: [ticketEmbed], components: [row2] });

          const ticketCollector = message.channel.createMessageCollector({
            filter,
            time: 15000,
          });

          ticketCollector.on("collect", (interaction) => {
            if (
              interaction.customId === "close_button" &&
              interaction.user.id === msg.author.id
            ) {
              const thankYouEmbed = new Discord.MessageEmbed()
                .setDescription("Terimakasih telah membeli point!")
                .setColor("#008000")
                .setTimestamp();

              interaction.update({ embeds: [thankYouEmbed], components: [] });
              ticketCollector.stop("user_closed_ticket");
            }
          });

          ticketCollector.on("end", (collected) => {
            if (collected.size === 0) {
              const timeoutEmbed = new Discord.MessageEmbed()
                .setDescription(
                  "Tiket ditutup karena tidak ada aktivitas dalam 15 detik."
                )
                .setColor("#FF0000")
                .setTimestamp();

              interaction.update({ embeds: [timeoutEmbed], components: [] });
            }
          });
        });
      })
      .catch(console.error);
  }
});
