const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)///schâwn
    if(!message.member.hasPermission(8)) return;
    let komut = args[0]
    if (!komut) return message.channel.send(`Hatalı kullanım örnek: \`.taglıalım aç/kapat\` ${config.no}`)///schâwn
    if (komut === "aç") {
        let data = await db.get(`taglialim.${message.guild.id}`)
        if (data) return message.channel.send(`Taglı alım modu zaten aktif. ${config.no}`)///schâwn
        await db.set(`taglialim.${message.guild.id}`, true)

        message.channel.send(`Taglı alım modu başarıyla aktif edildi. ${config.yes}`)///schâwn

    }
    if (komut === "kapat") {
        let data = await db.get(`taglialim.${message.guild.id}`)
        if (!data) return message.channel.send(`Taglı alım modu zaten kapalı. ${config.no}`)///schâwn
        await db.delete(`taglialim.${message.guild.id}`)
        message.channel.send(`Taglı alım modu başarıyla kapatıldı. ${config.yes}`)///schâwn

    }
    if (komut !== "aç" && komut !== "kapat") {
        return message.channel.send(embed.setDescription(`Hatalı kullanım örnek: \`.taglıalım aç/kapat\` ${config.no}`))
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    name: 'taglıalım',
    permLevel: 0
};
