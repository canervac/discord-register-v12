const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;///schâwn
    let data = await db.get("teyit") || {};

    let xd = Object.keys(data);///schâwn
    let topteyit = xd.filter(dat => message.guild.members.cache.has(dat)).sort((a, b) => Number((data[b].erkek || 0) + (data[b].kadın || 0)) - Number((data[a].erkek || 0) + (data[a].kadın || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} Toplam **${((data[value].erkek || 0) + (data[value].kadın || 0))}** (**${((data[value].erkek || 0))}** Erkek **${((data[value].kadın || 0))}** Kadın)`).splice(0, 25);///schâwn

    message.channel.send(embed.setDescription(`${topteyit.join("\n") || "Teyit veritabanı bulunamadı!"}`)).catch().then(m => m.delete({ timeout: 15000 }))


}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["tt"],
    name: 'topteyit',
    permLevel: 0
};
