const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!uye) {
        let erkek = await db.get(`teyit.${message.author.id}.erkek`)///schâwn
        let toplam = await db.get(`teyit.${message.author.id}.toplam`)
        let kız = await db.get(`teyit.${message.author.id}.kadın`)///schâwn

        if (toplam === null) toplam = "0"
        if (toplam === undefined) toplam = "0"///schâwn
        if (erkek === null) erkek = "0"
        if (erkek === undefined) erkek = "0"///schâwn
        if (kız === null) kız = "0"
        if (kız === undefined) kız = "0"///schâwn
        message.channel.send(embed.setDescription(`
${config.yes} ${message.author}, Kullanıcısının teyit bilgileri.

        > Toplam kayıtların: \`${toplam}\`
        > Erkek kayıtların: \`${erkek}\`
        > Kadın kayıtların: \`${kız}\``))
    }
    if (uye) {
        let erkek = await db.get(`teyit.${uye.id}.erkek`)///schâwn
        let toplam = await db.get(`teyit.${uye.id}.toplam`)
        let kız = await db.get(`teyit.${uye.id}.kadın`)///schâwn
        if (toplam === null) toplam = "0"
        if (toplam === undefined) toplam = "0"///schâwn
        if (erkek === null) erkek = "0"
        if (erkek === undefined) erkek = "0"///schâwn
        if (kız === null) kız = "0"
        if (kız === undefined) kız = "0"///schâwn

        message.channel.send(embed.setDescription(`
${config.yes} ${uye}, Kullanıcısının teyit bilgileri.

> Toplam kayıtların: \`${toplam}\`
> Erkek kayıtların: \`${erkek}\`
> Kadın kayıtların: \`${kız}\``))
    }

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ks"],
    name: 'teyitbilgi',
    permLevel: 0
};
