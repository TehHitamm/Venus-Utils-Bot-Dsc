const { Client, Intents, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: GatewayIntentBits.GUILD_MEMBERS | GatewayIntentBits.GUILD_MESSAGES
});

client.on('guildMemberAdd', member => {
  console.log(`User ${member.user.tag} has joined the server!`);


  const serverName = member.guild.name;
  const memberCount = member.guild.memberCount;

  const user = member.user;
  const username = user.username;
  const userId = user.id;
  const userAvatarUrl = user.avatarURL();

  // Berikan role baru ke member
  member.roles.add('982229907620900864')
    .then(console.log)
    .catch(console.error);

  // Buat pesan embed welcome message
  const welcomeEmbed = new Discord.MessageEmbed()
    .setTitle('Selamat Datang')
    .setDescription(`Welcome To ${serverName} <@${userId}>`)
    .addFields(
      { name: 'Harap Berperilaku Seperti Manusia pada Umumnya', value: `${serverName} Memiliki ${memberCount} Member` },
      { name: 'Discord Profile', value: `Username: ${username}\nID: ${userId}` }
    )
    .setThumbnail(userAvatarUrl)
    .setFooter(`Joined at: ${member.joinedAt}`);

  // Kirim pesan embed ke channel tertentu
  const channel = member.guild.channels.cache.get('992072696215109703');
  if (channel) {
    channel.send(welcomeEmbed);
  } else {
    console.log('Cannot find welcome channel!');
  }
});