let takachicim = require('./config.json');

let botcuk = [
      {
        name: `${takachicim.GuildName}_Moderation`,
        namespace: `${takachicim.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Main/Moderation"
      },
      {
        name: `${takachicim.GuildName}_Voucher`,
        namespace: `${takachicim.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Main/Register"
      },
      {
        name: `${takachicim.GuildName}_Statistics`,
        namespace: `${takachicim.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Main/Statistics"
      },
      {
        name: `${takachicim.GuildName}_Guard_I`,
        namespace: `${takachicim.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Guard/Guard_I"
      },
      {
        name: `${takachicim.GuildName}_Guard_II`,
        namespace: `${takachicim.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Guard/Guard_II"
      },
      {
        name: `${takachicim.GuildName}_Guard_III`,
        namespace: `${takachicim.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Guard/Guard_III"
      }
    ]

  if(takachicim.Destek.Active) {
    botcuk.push(
      {
        name: `${takachicim.GuildName}_Destek`,
        namespace: `${takachicim.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Destek"
      }
    )
  }
  if(takachicim.Welcome.Active) {
    botcuk.push(
      {
        name: `${takachicim.GuildName}_Welcomes`,
        namespace: `${takachicim.GuildName}`,
        script: 'Start.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Bots/Welcome"
      }
    )
  }

  module.exports = {
    apps: botcuk
  };