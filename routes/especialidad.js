const express = require("express");
const controllers = require("../controllers/especialidadController");
const especialidad = express.Router();

/* ====================================================
                    HOME
==================================================== */ 

especialidad.route("/especialidades").post(controllers.allEspecialidades);
especialidad.route("/crear-especialidad").post(controllers.createEspecialidad);
especialidad.route("/especialidad").put(controllers.modifyEspecialidad);
especialidad.route("/especialidad/:id").delete(controllers.deleteEspecialidad);

module.exports = especialidad;
