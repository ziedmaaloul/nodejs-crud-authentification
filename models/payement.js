const mongoose = require("mongoose");
const Client = require("./client.js");
const payementSchema = mongoose.Schema({
  type:  { type: String, required: true },
  motif:  { type: String, required: true },
  datePaye:  { type: String, required: false },
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: Client },
});
module.exports = mongoose.model("payement", payementSchema);
