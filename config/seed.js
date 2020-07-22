var configDB = require("./configDB");
var database = require("./database");



var user = database.user;

module.exports = function () {
    if (configDB.seed) {
        user.bulkCreate([
            { user_id: 0, name: "Ali", email: "Ali@gmail.com", password: "alibaba", contact_number: "9123456", language: "eng", role: "admin" },
            { user_id: 1, name: "sally", email: "saly@gmail.com", password: "sally", contact_number: "91232226", language: "eng", role: "user" },
            { user_id: 202, name: "Thana", email: "Thana@gmail.com", password: "alibaba", contact_number: "912236", language: "eng", role: "user" }

        ])
            .then(function () {
                console.log("done creating user records");

                //create other record if required


            })
    }
}
