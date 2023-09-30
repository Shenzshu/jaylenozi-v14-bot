const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const takachicim = require("../../../../../config.json");
const penals = require("../../../src/schemas/penals");
const bannedTag = require("../../../src/schemas/bannedTag");
const regstats = require("../../../src/schemas/registerStats");
const meetings = require("../../../src/schemas/meeting");
const { EmbedBuilder, ActivityType } = require("discord.js")
module.exports = async () => {

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  })
})

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
        url: "https://www.twitch.tv/takachixld"}), 10000);
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const newData = new bannedTag({ guildID: takachicim.GuildID })
  newData.save().catch(e => console.log(e))

  const newData2 = new regstats({ guildID: takachicim.GuildID })
  newData2.save().catch(e => console.log(e))

  let MeetingData = await meetings.findOne({ guildID: takachicim.GuildID })
  if(!MeetingData) {await meetings.updateOne({guildID: takachicim.GuildID}, {$set: {Toplantı: false}}, {upsert: true})}

setInterval(() => { TagAlıncaİsimKontrol(); }, 30 * 1000);
setInterval(() => { TagSalıncaİsimKontrol(); }, 35 * 1000);
setInterval(() => { TagAlıncaKontrol(); }, 20 * 1000);
setInterval(() => { TagBırakanKontrol(); }, 25 * 1000);
setInterval(() => { RolsuzeKayitsizVerme(); }, 10 * 1000);

async function TagAlıncaİsimKontrol() { // Tag alınca tarama
  const guild = client.guilds.cache.get(takachicim.GuildID)
  const members = [...guild.members.cache.filter(member => member.user.tag.includes(conf.tag) && member.displayName.includes(conf.ikinciTag)).values()].splice(0, 10)
  for await (const member of members) {
  await member.setNickname(member.displayName.replace(conf.ikinciTag, conf.tag))
}
};

async function TagSalıncaİsimKontrol() { // Tag alınca tarama
  const guild = client.guilds.cache.get(takachicim.GuildID)
  const members = [...guild.members.cache.filter(member => !member.user.tag.includes(conf.tag) && member.displayName.includes(conf.tag)).values()].splice(0, 10)
  for await (const member of members) {
  await member.setNickname(member.displayName.replace(conf.tag, conf.ikinciTag))
}
};

async function RolsuzeKayitsizVerme()  { // Rolü olmayanı kayıtsıza atma
const guild = client.guilds.cache.get(takachicim.GuildID);
let ozi = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
   ozi.forEach(r => {
   if (conf.unregRoles) r.roles.add(conf.unregRoles)
   })
};

async function TagAlıncaKontrol() { // Tag alınca tarama
const guild = client.guilds.cache.get(takachicim.GuildID)
const members = [...guild.members.cache.filter(member => member.user.tag.includes(conf.tag) && !member.roles.cache.has(conf.jailRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10)
for await (const member of members) {
if (conf.ekipRolu) await member.roles.add(conf.ekipRolu);
}
};

async function TagBırakanKontrol() { // Tagı olmayanın family rol çekme
const tagModedata = await regstats.findOne({ guildID: takachicim.GuildID })
const guild = client.guilds.cache.get(takachicim.GuildID)
const memberss = [...guild.members.cache.filter(member => !member.user.tag.includes(conf.tag) && member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10)
for await (const member of memberss) {
if (conf.unregRoles) {
if (tagModedata && tagModedata.tagMode === true) {
if(!member.roles.cache.has(conf.vipRole) && !member.roles.cache.has(conf.boosterRolu)) {
await member.roles.set(conf.unregRoles)
return}
}
} 
if (conf.ekipRolu) {
await member.roles.remove(conf.ekipRolu);
}
}
};
};

module.exports.conf = {
  name: "ready",
};
