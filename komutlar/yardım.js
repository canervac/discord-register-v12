const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)///schâwn


    message.channel.send(embed.setDescription(`
     Kayıt Yardım Menüsü
    -----------------------
    .erkek = \`@schâwn/ID\`
    .isim = \`@schâwn/ID\`
    .isimler = \`@schâwn/ID\`
    .kız = \`@schâwn/ID\`
    .taglıalım = \`@schâwn/ID\`
    .teyit-sıfırla = \`@schâwn/ID\`
    .teyitbilgi = \`@schâwn/ID\`
    .topteyit = \`@schâwn/ID\`
    -----------------------
   
        `)).then(m => m.delete({ timeout: 100000 }))///schâwn
    }
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['yardım','kayıt-help','kayıtyardım','kayıthelp','help'],
    name: 'kayıt-yardım',
    permLevel: 0
};
