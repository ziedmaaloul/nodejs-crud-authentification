const express = require("express");
const router = express.Router();
const Livraire = require("../models/livraire");
const {verifyToken} =require("../middleware/veriftoken")

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


router.post("/", verifyToken,  async (req, res) => {
  const { nomLivraire, numTel } = req.body;
  const newLivraire = new Livraire({
    numTel: numTel,
    nomLivraire: nomLivraire,
    compteID: req.user.id,
  });
  try {
    await newLivraire.save();
    res.status(200).json(newLivraire);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// chercher un Livraire
router.get("/:idLivraire", verifyToken , async (req, res) => {
  try {
    const scat = await Livraire.findById(req.params.idLivraire);
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// modifier un livraire
router.put("/:idLivraire", verifyToken , async (req, res) => {
  const { numTel, nomLivraire} = req.body;
  const id = req.params.idLivraire;
  console.log(id);
  try {
    const livraire = {
      numTel: numTel,
      nomLivraire: nomLivraire,
      compteID: req.user.id,
      _id: id,
    };
    await Livraire.findByIdAndUpdate(id, livraire);
    res.json(livraire);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Supprimer un livraire
router.delete("/:idLivraire", verifyToken , async (req, res) => {
  const id = req.params.idLivraire;
  await Livraire.findByIdAndDelete(id);
  res.json({ message: "idLivraire deleted successfully." });
});
module.exports = router;
