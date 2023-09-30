const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');  
const fs = require('fs');
const { Client, Collection, ActionRowBuilder, ButtonBuilder, ActivityType } = require('discord.js');
const { getVoiceConnection, joinVoiceChannel } = require("@discordjs/voice");
const Discord = require('discord.js');
const client = (global.bot = new Client({
  fetchAllMembers: true,
  intents: [ 32767 ],
  partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
})); 

const settings = require('./data.json');
const { cizgi, green, red, star } = require('../Main/src/configs/emojis.json');
const conf = require('../Main/src/configs/sunucuayar.json');
const takachicim = require('../../config.json');

client.on('ready', async () => {
  const guild = client.guilds.cache.first();
  const connection = getVoiceConnection(guild.id);
  if (connection) return;
  setInterval(async () => {
  let sesKanal = client.channels.cache.get(takachicim.BotSesKanal);
  if (sesKanal) { joinVoiceChannel({
      channelId: takachicim.BotSesKanal,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true
  })}},
  5000);

  let activities = takachicim.Destek.Activity, i = 0;
  setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
  type: ActivityType.Streaming,
  url: "https://www.twitch.tv/takachixld"}), 10000);
}); 

client.commands = new Collection();
var commands = [];

fs.readdirSync("./commands/").forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
});


const rest = new REST({ version: '10' }).setToken(takachicim.Destek.BotToken);

(async () => {
	try {
		console.log('[ozi] Komutlar yükleniyor.');

    await rest.put(
      Routes.applicationCommands(takachicim.Destek.BotClientID),
      { body: commands },
    );

		console.log('[ozi] Komutlar yüklendi.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
     command.execute(interaction, client);
  } catch (err) {
    if (err) console.error("Error: ", err);
  }
});

client.on('modalSubmit', async (modal) => {

  var LogChannel = client.guilds.cache.get(takachicim.GuildID).channels.cache.find((channel) => channel.id === settings.BaşvuruLogChannelID);
    if(modal.customId === 'ybasvuru') {
      const isimyas = modal.fields.getTextInputValue('isimyas');  
      const aktiflik = modal.fields.getTextInputValue('aktiflik');  
      const yarar = modal.fields.getTextInputValue('yarar');  
      const hakkında = modal.fields.getTextInputValue('hakkında'); 
  
      if (hakkında) {
  let ozi = new Discord.EmbedBuilder()
  .setDescription(`
  **${modal.user.tag}** - (\`${modal.user.id}\`) **Kullanıcısının Başvuru Formu**
  
  ${star}  **İsminiz ve yaşınız**
  \`${isimyas}\`
  
  ${star}  **Sunucumuzda günlük aktifliğiniz**
  \`${aktiflik}\`
  
  ${star}  **Sunucumuz için neler yapabilirsiniz**
  \`${yarar}\`
  
  ${star}  **Kendiniz hakkında biraz bilgi**
  \`${hakkında}\`
  
  ${modal.user} Kullanıcısı'nın Başvurusu;
  ${star} **Cevaplamak için :** \`/cevapla <user>.\`
  `)
  .setTimestamp()

        await modal.reply({ content: `Başvurunuz başarıyla alındı, yetkili arkadaşlar sizinle ilgilenecekler, başvuru formumuzu cevapladığın için teşekkür ederiz..`, ephemeral: true });
        await LogChannel.send({ content: `<@&${conf.yetkilialımRol}> ${modal.user}`,  embeds: [ozi] })      
      }
    }  
  });

  client
  .login((takachicim.Destek.BotToken))
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });
