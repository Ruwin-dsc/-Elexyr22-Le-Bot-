const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "sondage",
    description: "Sondage avec le bot",
    utilisation: "",
    alias: ["sondage"],
    permission: "MANAGE_MESSAGES",
    category: "2) Information",
    cooldown: 5,

    async run(bot, message, args, db) {
        message.delete()
        let lien = args[0];
        if(!lien) return message.channel.send("*Veuillez fournir une question !*");
      const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor("RANDOM")
      .setTitle(args.join(" "))
      .addField("=", `
     **Oui =** <a:Valide_Or:756978408159707136>
     **Non =** <a:Nop1:768183643020853298>
      `)
      .setTimestamp()
    
      const sondage = await message.channel.send({embeds : [embed]});
      await sondage.react("<a:Valide_Or:756978408159707136>");
      await sondage.react("<a:Nop1:768183643020853298>");
    }
})