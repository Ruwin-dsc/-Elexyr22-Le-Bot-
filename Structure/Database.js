const mysql = require("mysql")
const Database = new mysql.createConnection({
    host: "81.28.252.39",
    user: "u4_z7OXEuEHAG",
    password: "!cOj6EhbRg^@uN=pS9M5dMQG",
    database: "s4_elexyr_public"
})

Database.connect(function(err) {

    if(err) throw err;

    console.log("La base de données a été connectée avec succès !")
})

module.exports = Database;