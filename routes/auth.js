const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

const moment = require('moment')


/* POST login. */
//localhost:3000/auth/login
router.post('/login', function (req, res, next) {

    // console.log(req)
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log("info")
        console.log(info)
        if (err || !user) {
            console.log("err || !user:" + err)
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            console.log("user[0][datavalues] / user's id:" + user[0]["dataValues"]["user_id"])
            console.log("user[0][role] / user's role: " + user[0]["dataValues"]["role"])


            //number (1 hour)
            const expiry = Math.floor(Date.now() / 1000) + (60 * 60);
            //testing expiry of 1 minute
            //const expiry = Math.floor(Date.now() / 1000) + (60);
            console.log(moment.unix(expiry).format("LLLL"))

            const expiryFormated = moment.unix(expiry).format("LLLL");



            //default jwt sign is HMAC SHA256
            const token = jwt.sign(
                {
                    exp: expiry,
                    role: user[0]["dataValues"]["role"],
                    //data
                    data: user[0]["dataValues"]["user_id"]
                }
                ,
                //secret 
                'your_jwt_secret'

            );



            // //return token
            //ToRemove the role, expiresin,validto. 
            //Just return id
            return res.json({
                //   only need to return id. the rest can be removed
                id: token,

                //return user role in the token
                role: user[0]["dataValues"]["role"],
              
                //expiresin 60minute
                expiresIn: expiry,
                validTo: expiryFormated,

            });

            //best way of returning to frontend
            // res.cookie("SESSIONID", token,
            //     {
            //         //it's not accessible by the Javascript code at all
            //         httpOnly: true,
            //         //https only. Set to false for development.
            //         secure: false,
            //         domain: 'localhost:4200'
            //     });



            return res.json({ user, token });
        });
    })
        (req, res);

});



module.exports = router;