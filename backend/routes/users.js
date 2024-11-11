const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// Tüm adminleri getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
// Kullanıcı silme (Delete)
router.delete("/:username", async (req, res) => {
    try {
      const username = req.params.username;
  
      const deletedUser = await User.findOneAndDelete({ username });
  
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }
  
      res.status(200).json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

module.exports = router;