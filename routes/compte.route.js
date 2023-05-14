const express = require("express");
const router = express.Router();
const Compte = require("../models/compte");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {verifyToken} =require("../middleware/veriftoken")


// afficher la liste des utilisateurs.
router.get('/', async (req, res,) => {
  try {
    const comptes = await Compte.find().select("-password");
    res.status(200).json(comptes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.post('/register', async (req, res) => {
  try {
    let { idCompte, mot_de_passe, nomUtilisateur } = req.body
    const compte = await Compte.findOne({ idCompte })
    if (compte) return res.status(404).send({
      success: false, message:
        "Account already exists"
    })
    const newAccount = new Compte({ idCompte, mot_de_passe, nomUtilisateur })
    const createdAccount = await newAccount.save()
    return res.status(201).send({ success: true, message: "Account created successfully", user: createdAccount })
  } catch (err) {
    console.log(err)
    res.status(404).send({ success: false, message: err })
  }
});


router.post('/login', async (req, res) => {
  try {
    let { idCompte, mot_de_passe } = req.body
    if (!idCompte || !mot_de_passe) {
      return res.status(404).send({ success: false, message: "All fields are required" })
    }
    let compte = await Compte.findOne({
      idCompte
    }).select('+mot_de_passe').select('+isActive')
    if (!compte) {
      return res.status(404).send({ success: false, message: "Account doesn't exists" })
    } else {
      let isCorrectPassword = await bcrypt.compare(mot_de_passe, compte.mot_de_passe)
      if (isCorrectPassword) {
        delete compte._doc.mot_de_passe
        const token = jwt.sign({
          idcompte:
            compte._id, name: compte.nomUtilisateur
        }, process.env.SECRET, {
          expiresIn: "1h",
        })
        return res.status(200).send({ success: true, compte, token })
      } else {
        return res.status(404).send({
          success: false, message:
            "Please verify your credentials"
        })
      }
    }
  } catch (err) {
    return res.status(404).send({
      success: false, message: err.message
    })
  }
});

// modifier un compte
router.put("/", verifyToken , async (req, res) => {
  const { mot_de_passe, nomUtilisateur} = req.body;
  const id = req.params.idLivraire;
  try {
    const compte = {
      mot_de_passe: mot_de_passe,
      nomUtilisateur: nomUtilisateur,
      _id: req.user.id,
    };
    await Compte.findByIdAndUpdate(id, compte);
    res.json(compte);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
