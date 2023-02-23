const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "check-gban",
    description: "Permet de savoir si un utilisateur est GBAN",
    utilisation: "",
    alias: ["check-gban", "check", "cg"],
    permission: "",
    category: "1) Modération",
    cooldown: 5,

    async run(bot, message, args) {
        
        const { QuickDB } = require('quick.db');
        const db = new QuickDB();
        const blacklist = db.table(`blacklist`);

      let user;
      if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
          user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
          if(!user) return message.reply("*Aucune personne trouvée !*") }
        if(user == undefined) return message.reply("*Aucune personne trouvée !*");

        let fetched = await blacklist.get(user.id);
        if(!fetched) {
            return message.reply(`<:Elexyr22:754441336849170543> Informations Blacklist :: *L'utilisateur n'est pas GBAN !*`);
        } else {
            return message.reply(` <a:Alerte1:754441316905123994> L'utilisateur est **GBAN** pour :: ${fetched.reason}`);
        }
    }
})