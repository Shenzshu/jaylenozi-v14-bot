const { EmbedBuilder, ActivityType } = require("discord.js")
const takachicim = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async () => { 

let guild = client.guilds.cache.get(takachicim.GuildID);
await guild.members.fetch();

  const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

    const connection = getVoiceConnection(takachicim.GuildID);
    if (connection) return;
    setInterval(async () => {
    const VoiceChannel = client.channels.cache.get(takachicim.BotSesKanal);
    if (VoiceChannel) { joinVoiceChannel({
      channelId: VoiceChannel.id,
      guildId: VoiceChannel.guild.id,
      adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
      selfDeaf: true
    })}},
    5000);

    let activities = takachicim.BotDurum, i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.instagram.com/takachidev"}), 10000);

      client.rolbackup();
      client.kanalbackup();
      setInterval(async () => {
          await client.rolbackup();
          await client.kanalbackup();
      }, 1000 * 60 * 60 * 3)

};

module.exports.conf = {
  name: "ready",
};
