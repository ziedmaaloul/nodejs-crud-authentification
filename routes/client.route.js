const express = require("express");
const router = express.Router();
const Client = require("../models/client");


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


router.post("/", async (req, res) => {
   const { nomClient, postnomClient , prenomClient , adresseClient ,  numTel , compteID } = req.body;
  const newClient = new Client({
    postnomClient: postnomClient,
    numTel: numTel,
    prenomClient : prenomClient,
    adresseClient : adresseClient,
    nomClient: nomClient,
    compteID: compteID,
  });
  try {
    await newClient.save();
    res.status(200).json(newClient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// chercher un Client
router.get("/:idClient", async (req, res) => {
  try {
    const cli = await Client.findById(req.params.idClient);
    res.status(200).json(cli);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


// modifier un Cleint
router.put("/:idClient", async (req, res) => {
  const { nomClient, postnomClient , prenomClient , adresseClient ,  numTel , compteID } = req.body;
  const id = req.params.idClient;
  console.log(id);
  try {
    const client = {
      numTel: numTel,
      nomClient: nomClient,
      postnomClient: postnomClient,
      prenomClient : prenomClient,
      adresseClient : adresseClient,
      compteID: compteID,
      _id: id,
    };
    await Client.findByIdAndUpdate(id, client);
    res.json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// Supprimer un Cleint
router.delete("/:idClient", async (req, res) => {
  const id = req.params.idClient;
  await Client.findByIdAndDelete(id);
  res.json({ message: "idClient deleted successfully." });
});
module.exports = router;
