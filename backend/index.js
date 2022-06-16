const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");

const db = require("./config/database.js");
const app = express();

const rootRouter = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/cors", (req, res) => {
  res.set(
    "Access-Control-Allow-Origin",
    "https://featherweightheroes2.azurewebsites.net/"
  );
  res.send({ msg: "This has CORS enabled" });
});

// admin route 1: check database connection
app.get("/admin/check/", (req, res) => {
  db.authenticate()
    .then(() => res.send("database connection succeeded"))
    .catch((err) => res.send(`error in database connection: ${err}`));
});

app.get("/", (req, res) => {
  res.send("Welkom bij de FeatherWeightHeroes back-end");
});

app.use(rootRouter);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
