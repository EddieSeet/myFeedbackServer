var express = require('express');
var router = express.Router();

//config passport
const passport = require('passport');
require('../config/passport');

var userController = require("../controllers/user.controller");

//middleware to check the token and find out if they are authorized
function authorized(request, response, next) {
  passport.authenticate('jwt', { session: false, }, async (error, token) => {
    if (error || !token) {
      response.status(401).json({ message: 'Unauthorized' });
    }
    next();
  })(request, response, next);
}

//to get the method list in usercontroller, they need to be signed in.
router.get('/', authorized, userController.list);

module.exports = router;
