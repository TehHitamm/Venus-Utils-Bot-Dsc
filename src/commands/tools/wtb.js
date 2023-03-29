const { SlashCommandBuilder, MessageEmbed, MessageButton,  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wtb')
        .setDescription('Membeli item in-game dari player lain')
        .addStringOption(option => 
            option.setName('nick_ingame')
            .setDescription('Nick player di game')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('item')
            .setDescription('Nama item yang ingin dibeli')
            .setRequired(true))
        .addIntegerOption(option => 
            option.setName('jumlah')
            .setDescription('Jumlah item yang ingin dibeli')
            .setRequired(true)),
    async execute(interaction) {
        const nick_ingame = interaction.options.getString('nick_ingame');
        const item = interaction.options.getString('item');
        const jumlah = interaction.options.getInteger('jumlah');

        // Membuat pesan embed dengan informasi yang dimasukkan user
        const embed = new MessageEmbed()
            .setTitle(`Membeli ${jumlah} ${item} dari ${nick_ingame}`)
            .setDescription('Klik tombol "Jual" jika Anda menjual item ini.')
            .setColor('#FF8C00');
        
        // Membuat tombol untuk menjual item
        const button = new MessageButton()
            .setLabel('Jual')
            .setStyle(ButtonStyle.PRIMARY)
            .setCustomId('jual');
        
        // Menambahkan tombol ke pesan embed
        const row = new MessageActionRow()
            .addComponents(button);
        await interaction.reply({ embeds: [embed], components: [row] });

        // Menangani interaksi dengan tombol "Jual"
        const filter = i => i.customId === 'jual' && i.message.interaction.id === interaction. id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            const embed2 = new MessageEmbed()
                .setTitle(`Tiket untuk pembelian ${jumlah} ${item}`)
                .setDescription('Silakan berdiskusi dengan penjual mengenai pembelian ini.')
                .setColor('#008000');
            const button2 = new MessageButton()
                .setLabel('Tutup')
                .setStyle(ButtonStyle.DANGER)
                .setCustomId('tutup');
            const row2 = new MessageActionRow()
                .addComponents(button2);
            await i.reply({ embeds: [embed2], components: [row2] });
        });

        collector.on('end', async collected => {
            button.setDisabled(true);
            const user = collected.first()?.user;
            if (user) {
                const embed3 = new MessageEmbed()
                    .setTitle(`Item telah berhasil dibeli oleh ${user.username}`)
                    .setDescription(`Terima kasih atas pembeliannya!`);
                await interaction.editReply({ embeds: [embed3], components: [] });
            } else {
                await interaction.editReply({ components: [] });
            }
        });
    },
};
