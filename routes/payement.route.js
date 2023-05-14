const express = require("express");
const router = express.Router();
const Payement = require("../models/payement");


// Find All

router.get("/", async (req, res) => {
  try {
    const payement = await Payement.find();
    res.status(200).json(payement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// Create New Payement

router.post("/", async (req, res) => {
  const { type, motif , datePaye , clientID } = req.body;
  const newPayement = new Payement({
    type: type,
    motif: motif,
    datePaye : datePaye,
    clientID: clientID,
  });
  try {
    await newPayement.save();
    res.status(200).json(newPayement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// chercher une Payement
router.get("/:idPayement", async (req, res) => {
  try {
    const pay = await Payement.findById(req.params.idPayement);
    res.status(200).json(pay);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// modifier un payement
router.put("/:idPayement", async (req, res) => {
  const { type, motif, datePaye ,clientID } = req.body;
  const id = req.params.idPayement;
  console.log(id);
  try {
    const payement = {
      type: type,
      motif: motif,
      datePaye: datePaye,
      clientID: clientID,
      _id: id,
    };
    await Payement.findByIdAndUpdate(id, payement);
    res.json(payement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Supprimer un livraire
router.delete("/:idPayement", async (req, res) => {
  const id = req.params.idPayement;
  await Payement.findByIdAndDelete(id);
  res.json({ message: "Payement deleted successfully." });
});
module.exports = router;
