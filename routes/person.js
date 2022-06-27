const express = require("express");
const controllers = require("../controllers/personController");
const person = express.Router();

/* ====================================================
                    HOME
==================================================== */ 


person.route("/login").get(controllers.ControllerLogin);

module.exports = person;