const { SlashCommandBuilder, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wts')
        .setDescription('Menjual item in-game kepada player lain')
        .addStringOption(option => 
            option.setName('item')
            .setDescription('Nama item yang ingin dijual')
            .setRequired(true))
        .addIntegerOption(option => 
            option.setName('jumlah')
            .setDescription('Jumlah item yang ingin dijual')
            .setRequired(true))
        .addIntegerOption(option => 
            option.setName('harga')
            .setDescription('Harga per unit item')
            .setRequired(true)),
    async execute(interaction) {
        const item = interaction.options.getString('item');
        const jumlah = interaction.options.getInteger('jumlah');
        const harga = interaction.options.getInteger('harga');

        // Membuat pesan embed dengan informasi yang dimasukkan user
        const embed = new MessageEmbed()
            .setTitle(`Menjual ${jumlah} ${item} dengan harga ${harga}`)
            .setDescription('Klik tombol "Beli" jika Anda ingin membeli item ini.')
            .setColor('#FFD900');
        
        // Membuat tombol untuk membeli item
        const button = new MessageButton()
            .setLabel('Beli')
            .setStyle('PRIMARY')
            .setCustomId('beli');
        
        // Menambahkan tombol ke pesan embed
        const row = new MessageActionRow()
            .addComponents(button);
        await interaction.reply({ embeds: [embed], components: [row] });

        // Menangani interaksi dengan tombol "Beli"
        const filter = i => i.customId === 'beli' && i.message.interaction.id === interaction.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            const embed2 = new MessageEmbed()
                .setTitle(`Tiket untuk pembelian ${jumlah} ${item}`)
                .setDescription(`Silakan berdiskusi dengan penjual mengenai pembelian ini. Harga per unit adalah ${harga}.`)
                .setColor('#008000');
            const button2 = new MessageButton()
                .setLabel('Tutup')
                .setStyle('DANGER')
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
                    .setDescription(`Terima kasih telah membeli ${jumlah} ${item} dengan harga ${harga}!`);
                await interaction.editReply({ embeds: [embed3], components: [] });
            } else {
                await interaction.editReply({ components: [] });
            } 
        });
    },
};
