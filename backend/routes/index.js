const express = require("express");
const router = express.Router();

//Diğer Route dosyalarını içe aktarma
const alimRoute = require("./alimler.js");
const authRoute = require("./auth.js");
const userRoute = require("./users.js");
const autoresRoute = require("./autores.js");

//Her Routeı ilgili yol altında kullanmak
router.use("/alimler", alimRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/autores", autoresRoute);

module.exports = router ;