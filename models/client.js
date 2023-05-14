const mongoose = require("mongoose");
const Compte = require("./compte.js");
const livraireSchema = mongoose.Schema({
  nomClient: { type: String, required: false },
  postnomClient: { type: String, required: false },
  prenomClient: { type: String, required: false },
  adresseClient: { type: String, required: false },
  numTel:  { type: String, required: false },
  compteID: { type: mongoose.Schema.Types.ObjectId, ref: Compte },
});
module.exports = mongoose.model("client", livraireSchema);
