const express = require("express");
const mongoose = require("mongoose");
const connectToDb = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());

connectToDb();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
