const express = require("express");
const Alim = require("../models/alim");
const router = express.Router();

//Tüm Alimleri Getirme
router.get("/", async (req, res)=> {
    try {
        const alimler = await Alim.find();
        res.status(200).json(alimler);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"});
    }
});

//Yeni Alim Oluşturma
router.post("/", async (req, res)=>{
    try {
        const {name , fullname, borntime, deathtime, century, life, works, extra, region, worktype, picture, civilization, source, organizer} = req.body;
        let picturePath = picture;
        if (!picture || picture === '') {
          picturePath = 'https://r.resimlink.com/_oRpyZYj7JN.png';
        }
        const newAlim = new Alim({name , fullname, borntime, deathtime, century, life, works, extra, region, worktype, picture: picturePath, civilization, source, organizer});
        await newAlim.save();
        res.status(201).json(newAlim);

    } catch (error) {
        console.log(error);
    }
})

//Alim Güncelleme
router.put("/:alimId", async (req, res) => {
    try {
      const alimId = req.params.alimId;
      const updates = req.body;
      const existingAlim = await Alim.findById(alimId);
      if (!existingAlim) {
        return res.status(404).json({ error: "Alim Bulunamadı" });
      }
      if (!updates.picture || updates.picture === '') {
        updates.picture = 'https://r.resimlink.com/_oRpyZYj7JN.png';
      }
      const updatedAlim = await Alim.findByIdAndUpdate(
        alimId,
        updates,
        { new: true }
      );
      res.status(200).json(updatedAlim);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

  //Belirli bir alimi getirme
router.get("/:alimId", async (req, res) => {
  try {
    const alimId = req.params.alimId;

    try {
      const alim = await Alim.findById(alimId);

      res.status(200).json(alim);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Alim bulunamadı" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

  //Alim Silme
  router.delete("/:alimId", async (req, res) => {
    try {
      const alimId = req.params.alimId;
  
      const deletedAlim = await Alim.findByIdAndDelete(alimId);
  
      if (!deletedAlim) {
        return res.status(404).json({ error: "Alim Bulunamadı" });
      }
  
      res.status(200).json(deletedAlim);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

// Alimleri isme göre ara
router.get("/search/:alimName", async (req, res) => {
  try {
    const alimName = req.params.alimName.toUpperCase(); // Arama terimini büyük harfe çevir
    const alims = await Alim.find({
      name: { $regex: alimName, $options: "i" } // Büyük/küçük harf hassasiyetini kaldıran "i" bayrağı
    });

    res.status(200).json(alims);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});




module.exports = router ;