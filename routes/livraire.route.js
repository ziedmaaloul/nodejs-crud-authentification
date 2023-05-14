const express = require("express");
const router = express.Router();
const Livraire = require("../models/livraire");


// Find All

router.get("/", async (req, res) => {
  try {
    const livraire = await Livraire.find();
    res.status(200).json(livraire);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// Créer Une Nouvelle Livraire


router.post("/", async (req, res) => {
  const { nomLivraire, numTel , compteID } = req.body;
  const newLivraire = new Livraire({
    numTel: numTel,
    nomLivraire: nomLivraire,
    compteID: compteID,
  });
  try {
    await newLivraire.save();
    res.status(200).json(newLivraire);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// chercher un Livraire
router.get("/:idLivraire", async (req, res) => {
  try {
    const scat = await Livraire.findById(req.params.idLivraire);
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// modifier un livraire
router.put("/:idLivraire", async (req, res) => {
  const { numTel, nomLivraire, compteID } = req.body;
  const id = req.params.idLivraire;
  console.log(id);
  try {
    const livraire = {
      numTel: numTel,
      nomLivraire: nomLivraire,
      compteID: compteID,
      _id: id,
    };
    await Livraire.findByIdAndUpdate(id, livraire);
    res.json(livraire);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Supprimer un livraire
router.delete("/:idLivraire", async (req, res) => {
  const id = req.params.idLivraire;
  await Livraire.findByIdAndDelete(id);
  res.json({ message: "idLivraire deleted successfully." });
});
module.exports = router;
