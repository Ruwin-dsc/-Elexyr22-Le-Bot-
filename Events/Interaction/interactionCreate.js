const Discord = require("discord.js")
const Event = require("../../Structure/Event");

module.exports = new Event("interactionCreate", async (bot, interaction) => {

    const db = bot.db;

    if(interaction.isCommand()) {

        const command = bot.commands.get(interaction.commandName)

        if(!bot.cooldown.has(command.name)) {
            bot.cooldown.set(command.name, new Discord.Collection())
        }

        const time = Date.now();
        const cooldown = bot.cooldown.get(command.name);
        const timeCooldown = (command.cooldown || 5) * 1000;

        if(cooldown.has(interaction.user.id)) {

            const timeRestant = cooldown.get(interaction.user.id) + timeCooldown;

            if(time < timeRestant) {

                const timeLeft = (timeRestant - time);

                return
            }
        }

        cooldown.set(interaction.user.id, time);
        setTimeout(() => cooldown.delete(interaction.user.id), timeCooldown);

        /*if(command.permission === "Développeur" && interaction.user.id !== conf.owner) return interaction.reply("Vous n'avez pas la permission requise pour exécuter cette commande !")
        if(command.permission !== "Aucune" && command.permission !== "Développeur" && !interaction.member.permissions.has(new Discord.Permissions(command.permission))) return interaction.reply("Vous n'avez pas la permission requise pour exécuter cette commande !") */

        command.run(bot, interaction, interaction.options, bot.db)
    }

      if(interaction.isUserContextMenu()) {

        const command = bot.commands.get(interaction.commandName)

        command.run(bot, interaction, interaction.options, bot.db)
    }  

    // création ticket 
    
    if(interaction.isButton()) {

        if(interaction.customId === "ticket") {

            let channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {type: "GUILD_TEXT"})
          //  await channel.setParent(interaction.channel.parentId)

            await channel.permissionOverwrites.create(interaction.user, {
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            })
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
                EMBED_LINKS: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
            })

            await interaction.reply({content: `Votre ticket a été créé avec succès ${channel} !`, ephemeral: true})
            
            let Embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle("Ticket créé")
            .setDescription(`${interaction.user.tag} vient de créé un ticket !`)
            .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
            .setStyle("DANGER")
            .setEmoji("🔒")
            .setLabel("Fermer le ticket")
            .setCustomId("close"),
            new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setEmoji("📑")
            .setLabel("Demander le transcript")
            .setCustomId("transcript"))

            await channel.send(`${interaction.user}`)
            await channel.send({embeds: [Embed], components: [btn]})
        }

        if(interaction.customId === "transcript") {
  
            /* await interaction.deferReply()
            await bot.channels.cache.get(req[0].channelID).send({content: `Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`, files: [await transcript.createTranscript(interaction.channel)]})
            await interaction.editReply({content: "Transcript envoyé avec succès !", ephemeral: true}) */
            await interaction.reply({content: `*Le transcript sera patch, bientôt, nous avons beaucoup de taff !*`, ephemeral: true})
        }

        if(interaction.customId === "close") {

            /* let user = interaction.guild.members.cache.find(m => m.user.username === interaction.message.embeds[0].description.split(" ")[0].split("#")[0] && m.user.discriminator === interaction.message.embeds[0].description.split(" ")[0].split("#")[1]).user;
            try {await user.send(`Votre ticket a été supprimé par ${interaction.user.tag}`)} catch (err) {} */
            await interaction.channel.delete()
        }

        if (interaction.customId === "verif") {
            db.query(`SELECT * FROM verif WHERE bot = ${bot.user.id}`, async (err, req) => {

                interaction.member.roles.add(req[0].role)

            })

        
            interaction.reply({content: `<:Elexyr22:754441336849170543> **Tu a désormais accès au serveur !** <a:Valide_Or:756978408159707136>`, ephemeral: true})

        }
            // CMD GW !
    
           /* if(interaction.customId.startsWith("giveaway_")) {
    
                let ID = interaction.customId.split("_")[1];
    
                db.query(`SELECT * FROM participants WHERE ID = '${interaction.user.id} ${ID}'`, async (err, req) => {
    
                    if(req.length < 1) {
    
                        let sql = `INSERT INTO participants (ID, giveawayID, userID) VALUES ('${interaction.user.id} ${ID}', '${ID}', '${interaction.user.id}')`
                        db.query(sql, function(err) {
                            if(err) throw err;
                        })
    
                        await interaction.reply({content: `Vous participez avec succès au concours \`${ID}\` !`, ephemeral: true})
    
                    } else {
    
                        db.query(`DELETE FROM participants WHERE ID = '${interaction.user.id} ${ID}'`)
    
                        await interaction.reply({content: `Vous retirez votre participation avec succès au concours \`${ID}\` !`, ephemeral: true})
                    }
                }) 
            } */
       }
    }) 