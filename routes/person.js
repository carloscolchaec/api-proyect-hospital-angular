const express = require("express");
const controllers = require("../controllers/personController");
const person = express.Router();

/* ====================================================
                    HOME
==================================================== */ 


person.route('/login').post(controllers.ControllerLogin); // LOGIN
person.route('/register').post(controllers.ControllerRegister); // CREATE PERSON

person.route('/personas').post(controllers.ControllerAllPersons); // SHOW PERSONS
person.route('/persona').put(controllers.ControllerEditPerson); // EDIT PERSON
person.route('/persona').delete(controllers.ControllerDeletePerson); // DELETE PERSON

module.exports = person;