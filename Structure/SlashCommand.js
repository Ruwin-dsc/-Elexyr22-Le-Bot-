const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const Builders = require("@discordjs/builders")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { token } = require("../config")

module.exports = async(bot) => {

    const commands = [
    	new SlashCommandBuilder()
        .setName("discord-gg-elexyr22")
        .setDescription("Meilleur Serveur Nitro !"),
        
        new SlashCommandBuilder()
        .setName("axial-host-fr")
        .setDescription("Meilleur Hébergeur FR"),
        

]
      
    const rest = new REST({ version: "9" }).setToken(token)

    bot.guilds.cache.forEach(async guild => {
        
        await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands }).catch(err => {if(err.code == "50001") return}) ;
    })

    console.log("Les slashs commandes ont été créées avec succès !")
}