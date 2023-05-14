const express = require("express");
const router = express.Router();
const Compte = require("../models/compte");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


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


// modifier un article
// router.put("/:articleId", async (req, res) => {
//   const {
//     reference,
//     designation,
//     prix,
//     marque,
//     qtestock,
//     imageart,
//     scategorieID,
//   } = req.body;
//   const id = req.params.articleId;
//   try {
//     const art1 = {
//       reference: reference,
//       designation: designation,
//       prix: prix,
//       marque: marque,
//       qtestock: qtestock,
//       imageart: imageart,
//       scategorieID: scategorieID,
//       _id: id,
//     };
//     await Article.findByIdAndUpdate(id, art1);
//     res.json(art1);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });
// Supprimer un article
router.delete("/:articleId", async (req, res) => {
  const id = req.params.articleId;
  await Article.findByIdAndDelete(id);
  res.json({ message: "article deleted successfully." });
});
module.exports = router;
