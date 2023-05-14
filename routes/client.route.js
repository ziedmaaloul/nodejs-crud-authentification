const express = require("express");
const router = express.Router();
const Client = require("../models/client");
const {verifyToken} =require("../middleware/veriftoken")

// Find All

router.get("/", async (req, res) => {
  try {
    const client = await Client.find();
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// Create new Cient


router.post("/", verifyToken , async (req, res) => {
   const { nomClient, postnomClient , prenomClient , adresseClient ,  numTel } = req.body;
  const newClient = new Client({
    postnomClient: postnomClient,
    numTel: numTel,
    prenomClient : prenomClient,
    adresseClient : adresseClient,
    nomClient: nomClient,
    compteID: req.user.id,
  });
  try {
    await newClient.save();
    res.status(200).json(newClient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// chercher un Client
router.get("/:idClient", verifyToken , async (req, res) => {
  try {
    const cli = await Client.findById(req.params.idClient);
    res.status(200).json(cli);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// modifier un Cleint
router.put("/:idClient", verifyToken , async (req, res) => {
  const { nomClient, postnomClient , prenomClient , adresseClient ,  numTel } = req.body;
  const id = req.params.idClient;
  console.log(id);
  try {
    const client = {
      numTel: numTel,
      nomClient: nomClient,
      postnomClient: postnomClient,
      prenomClient : prenomClient,
      adresseClient : adresseClient,
      compteID: req.user.id,
      _id: id,
    };
    await Client.findByIdAndUpdate(id, client);
    res.json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Supprimer un Cleint
router.delete("/:idClient", verifyToken , async (req, res) => {
  const id = req.params.idClient;
  await Client.findByIdAndDelete(id);
  res.json({ message: "idClient deleted successfully." });
});
module.exports = router;
