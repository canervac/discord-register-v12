const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)///schâwn
    if( !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir kullanıcı etiketlemek zorundasın örneğin; \n \`.teyit-sıfırla @schâwn/ID\` ${config.yes}`)).then(m => m.delete({ timeout: 5000 }))
    if (uye) {
        db.delete(`teyit.${uye.id}.toplam`)///schâwn
        db.delete(`teyit.${uye.id}.kadın`)///schâwn
        db.delete(`teyit.${uye.id}.erkek`)
        message.channel.send(embed.setDescription(`${uye} Üyesinin Kayıt Verileri Sıfırlandı ${config.yes}`))///schâwn
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    name: 'teyit-sıfırla',
    permLevel: 0
};
