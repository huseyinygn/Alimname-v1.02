const express = require("express");
const router = express.Router();

//AutoResponse Verme
router.get("/", async (req, res)=> {
    try {
        res.status(200).json("Backend server is running!");
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;