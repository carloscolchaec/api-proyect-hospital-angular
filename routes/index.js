const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

/* ====================================================
                    HOME
==================================================== */ 

router.route("/").get(controllers.helloAPI);


module.exports = router;