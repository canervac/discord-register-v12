const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const config = require("./config.json")
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const app = express();


var prefix = config.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.conf.name}.`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.conf.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.conf.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === config.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(config.token);


///     _     _  _                    _      _ 
///    /\  /\ ___   ___   __ _   ___ | |  __| |(_) _ __      /\ /\(_) ___  _ __ ___  (_)
///   / /_/ // _ \ / __| / _` | / _ \| | / _` || || '_ \    / //_/| |/ __|| '_ ` _ \ | |
///  / __  /| (_) |\__ \| (_| ||  __/| || (_| || || | | |  / __ \ | |\__ \| | | | | || |
///  \/ /_/  \___/ |___/ \__, | \___||_| \__,_||_||_| |_|  \/  \/ |_||___/|_| |_| |_||_|
///                      |___/                                                         

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-999])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9999])/g, d => {
          return {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`,
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "xxx");///hoşgeldin kanal ID
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Güvenilir Gözükmüyor.'
  if (kurulus > 1296000000) kontrol = 'Hesap Güvenli'
    moment.locale("tr");
    kanal.send(`
schâwn'a Hoş geldin <@`+ member + `> Seninle birlikte ${member.guild.memberCount} kişi olduk
Hesabın __`+kontrol+`__ tarihinde oluşturulmuş
Kayıt olmak için ses teyit kanallarına geçip yetkili arkadaşlarımızı bekliyebilirsin 
\`Tagımıza ulaşmak için herhangi bir kanala (.tag) yazman yeterlidir. Şimdiden iyi eğlenceler!\`
`)});
                       
client.on("guildMemberAdd", async (member) => {
    member.roles.add(config.kayıtsızRolü)
    member.setNickname(config.nick)
    
    });