var Sequelize = require("sequelize");
var configDB = require("./configDB");

var database;



database = new Sequelize(
    configDB.mysql.database,
    configDB.mysql.username,
    configDB.mysql.password, {
        host: configDB.mysql.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: configDB.mysql.logging
    }
);

var user = require("../model/user.model")(database);

database
    .sync({
        force: configDB.seed
    })
    .then(function () {
        console.log("Database in Sync Now");
        require("./seed")();
    })

module.exports = {
   user: user,
}