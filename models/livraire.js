const mongoose = require("mongoose");
const Compte = require("./compte.js");
const livraireSchema = mongoose.Schema({
  nomLivraire: { type: String, required: false },
  numTel:  { type: String, required: false },
  compteID: { type: mongoose.Schema.Types.ObjectId, ref: Compte },
});
module.exports = mongoose.model("livraire", livraireSchema);
