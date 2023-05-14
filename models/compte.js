const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const compteSchema = new mongoose.Schema({
  idCompte: {
    type: Number,
    required: true,
    unique: true
  },
  mot_de_passe: {
    type: String,
    required: true,
  },
  nomUtilisateur: {
    type: String,
    required: true,
    },
})

compteSchema.pre('save', async function(next) {
  if (!this.isModified('mot_de_passe')) return next()
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.mot_de_passe, salt)
  this.mot_de_passe = hashedPassword
  next()
  })
module.exports = mongoose.model('Compte', compteSchema)