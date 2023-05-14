const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
//BodyParser Middleware
app.use(express.json());
mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.log("Impossible de se connecter à la base de données", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.send("bonjour");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
// export default app;

const compteRouter = require("./routes/compte.route");
app.use("/api/comptes", compteRouter);

const Livarires = require("./routes/livraire.route");
app.use("/api/livraires", Livarires);


const client = require("./routes/client.route");
app.use("/api/clients", client);

const payement = require("./routes/payement.route");
app.use("/api/payements", payement);
