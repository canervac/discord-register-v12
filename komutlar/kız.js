const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.json");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)///schâwn
    if(!message.member.roles.cache.has(config.kayıtcıRolü) && !message.member.hasPermission(8)) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(`${message.author}, Bir kullanıcı etiketlemek zorundasın örneğin; \`.k @schâwn/ID\` ${config.yes}`).then(m => m.delete({ timeout: 7000 }))///schâwn
    args = args.filter(a => a !== "" && a !== " ").splice(1)///schâwn
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;///schâwn
    if (!isim || !yaş) return message.channel.send(`${message.author}, Bir isim belirtmek zorundasın örneğin; \`.k @schâwn/ID schâwn\` ${config.yes}`).then(m => m.delete({ timeout: 7000 }))
    let name = `${uye.user.username.includes(config.tag) ? config.tag : config.unTag} ${isim} | ${yaş}`
    if (uye.id === client.user.id) return message.channel.send(`Üzgünüm kendimi kayıt edemem  ${config.no}`).then(m => m.delete({ timeout: 7000 }))
    if (uye.id === message.author.id) return message.channel.send(`Üzgünüm, kendini kayıt etmemi bekleme lütfen. ${config.no}`).then(m => m.delete({ timeout: 7000 }))///schâwn
    let data = await db.get(`taglialim.${message.guild.id}`)///schâwn
    if (data) {
        if (!uye.user.username.includes(config.tag) && !uye.roles.cache.has(config.boosterRolü) && !uye.roles.cache.has(config.vipRolü)) return message.channel.send(embed.setDescription(`Sunucumuz şuanda taglı alımdadır tagımızı alarak \`${config.tag}\` veya boost basarak <@&906627896771227689> kayıt işlemini gerçekleştirebilirsiniz.`))
    }
    if (config.kızRolleri.some(e => uye.roles.cache.has(e))) return message.channel.send(embed.setDescription(`Bu kullanıcı zaten daha önce kayıt olmuş.`)).then(m => m.delete({ timeout: 7000 }))///schâwn

    let x = await db.get(`isimler.${uye.id}`)
    if (x) {
        let isimlerr = x.filter(uye => uye.userID === uye.id).map((cross, index) => `\`${cross.isim}\` (<@&${cross.rol}>)`).splice(0, 10)

        message.channel.send(embed.setDescription(`
        ${uye} kişisinin ismi başarıyla **\`${name}\`** olarak değiştirildi, bu üye daha bu isimlerle kayıt olmuş.

        ${config.no} Kişinin toplamda ${isimlerr.length} isim kayıtı bulundu
        Tüm isim geçmişine ${config.prefix}isimler \`@${uye.user.username}/ID\`  ile bakabilirsiniz.
        ${isimlerr.join("\n")}`)).then(m => m.delete({ timeout: 10000 }))///schâwn
    }
    if (!x) {
        message.channel.send(embed.setDescription(`
        ${uye} kişisinin ismi başarıyla **\`${name}\`** olarak değiştirildi, ${message.guild.roles.cache.get(config.kız1)} rolü verildi.
        
    ${config.no} Kişinin Daha Önce Kaydı Bulunamadı
   
        `)).then(m => m.delete({ timeout: 10000 }))
    }

    if (uye.roles.cache.has(config.vipRolü) ? await uye.roles.set(config.kızRolleri) && uye.roles.add(config.vipRolü) : uye.roles.set(config.kızRolleri))///schâwn
                if (uye.user.username.includes(config.tag)) uye.roles.add(config.Family)
   uye.setNickname(name)
    message.react(config.yes)///schâwn
    
    client.channels.cache.get("906539163384438784").send(`${uye} Adlı kullanıcı başarıyla kaydolup aramıza katıldı !`)

    await db.add(`teyit.${message.author.id}.kadın`, 1)
    await db.add(`teyit.${message.author.id}.toplam`, 1)///schâwn
    await db.push(`isimler.${uye.id}`, { isim: name, rol: config.kız1, yetkili: message.author.id, zaman: Date.now() })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['k'],
    name: 'kız',
    permLevel: 0
};
