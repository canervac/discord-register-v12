const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)///schâwn
    if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])///schâwn
    let x = await db.fetch(`isimler.${uye.id}`)
    if (!x || !db.fetch(`isimler.${uye.id}`)) return message.channel.send(embed.setDescription(`Bu Kullanıcının geçmiş isimleri bulunamadı.`))
    let isimler = x.map((cross, index) => `\`${cross.isim}\` (<@&${cross.rol}>)`).splice(0, 15)///schâwn
    if (!uye) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmek zorundasın örneğin; \n \`.isimler @schâwn/ID\`  ${config.yes}`))
    message.channel.send(embed.setDescription(`
 ${uye}, Kullanıcısının toplam **${isimler.length}** kayıtı bulundu. ///schâwn

${isimler.join("\n")}`))

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    name: 'isimler',
    permLevel: 0
};
