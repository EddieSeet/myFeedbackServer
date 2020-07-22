var UserModel = require("./database").user

//tutorial
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async function (email, password, cb) {

            //this one is typically a DB call. Assume that the returned user object
            //is pre-formatted and ready for storing in JWT
            console.log("passport1");

            return await UserModel.findAll
                ({
                    where: { email: email },
                    defaults: { password: password }
                })
                .then(user => {

                    if (user[0] == undefined) {
                        console.log("!user");
                        return cb(null, false, { message: "Incorrect email." });
                    } else if (user[0]["password"] !== password) {
                        return cb(null, false, { message: "Incorrect  password." });
                    } else {
                        return cb(null, user, { message: "Logged In Successfully" });
                    }
                })
                .catch(err => cb(err));


        }
    )
);

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "your_jwt_secret"
        },
        async function (jwtPayload, cb) {
            console.log(jwtPayload)
            return await UserModel.findOne({

                //jwt signed with email and not user_id
                //     where: { email: jwtPayload.email }
                //JWT signed with user_id and not email
                where: { user_id: jwtPayload.data }

            })
                .then(user => {
                    console.log("2nd passport");

                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    )
);

