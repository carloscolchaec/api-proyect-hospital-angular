const express = require("express");
const controllers = require("../controllers/personController");
const person = express.Router();

/* ====================================================
                    HOME
==================================================== */ 


person.route('/login').post(controllers.ControllerLogin);
person.route('/register').post(controllers.ControllerRegister);


module.exports = person;