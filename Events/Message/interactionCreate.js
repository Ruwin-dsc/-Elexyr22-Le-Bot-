const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const Event = require("../../Structure/Event");

module.exports = new Event("interactionCreate", async (bot, interaction, member) => {

    const db = bot.db;
    
    if(interaction.isButton()) {

        if(interaction.customId === "commus") {

          const member = interaction.member

            const row1 = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setURL(`https://restorecord.com/verify/Communaut%C3%A9%20de%20Elexyr22%20%F0%9F%91%91%20`)
                .setLabel('Vérification')
                .setStyle('LINK'),
            );
            let embed = new MessageEmbed()
            .setColor("RED")
            .setDescription("Vérification **Anti-Bot | Anti-VPN, Proxys et 4G !** \n\n Pour accédez au __serveur__ cliqué sûr le lien juste en dessous !")
            .setImage("https://cdn.discordapp.com/attachments/765158755905961984/1024367257293443163/captcha-google.gif")
            .setTimestamp()
            .setFooter("⚠ Message supprimé dans 5 min !")
            member.send({ embeds: [embed], components : [row1]}).then(async mess => setTimeout(async () => {mess.delete()}, 300000))
        
}}})
