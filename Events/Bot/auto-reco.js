const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const mysql = require("mysql")

module.exports = new Event("guildMemberAdd", async (bot) => {
    
    
const Database = new mysql.createConnection({
    host: "172.18.0.1",
    user: "u306_HqD8YUQUYA",
    password: "@BEGUf@=uZSVs4Nz7^^ql2rc",
    database: "s306_elexyr"
})

Database.connect(function(err) {

    if(err) throw err;

    console.log("La base de données a été reconnectée auto !")
})

module.exports = Database;
    

})