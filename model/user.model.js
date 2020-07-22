

var Sequelize = require("sequelize");

module.exports = function (database) {

    return database.define("user", {
        user_id: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        },

        email: {
            type: Sequelize.STRING,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        },
        contact_number: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        },


        language: {
            type: Sequelize.STRING,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            primaryKey: false,
            autoIncrement: false,
            allowNull: false
        }
    },
        {
            //fix the table name to not use plural (users)
            freezeTableName: true,
            tablename: "user",
            timestamps: false
        })
}

