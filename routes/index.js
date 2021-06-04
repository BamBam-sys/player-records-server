const express = require("express");
const dbClient = require("../database");
const path = require("path");
// const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatars");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: avatarStorage,
});

router.post("/player", async (req, res) => {
  const { name, position, clubName } = req.body;

  const query = `INSERT INTO players (name, position, clubName) VALUES ($1, $2, $3)`;
  const values = [name, position, clubName];
  await dbClient.query(query, values);

  const message = "Data Successfully added!";

  res.send({ message });
});

router.patch("/player/:id", async (req, res) => {
  const { clubName } = req.body;
  const { id } = req.params;

  const query = `UPDATE players SET clubName = $1 WHERE id = $2`;
  const values = [clubName, id];

  await dbClient.query(query, values);

  res.json({ message: "Player's club has been updated" });
});

router.put("/player/avatar/:id", upload.single("image"), async (req, res) => {
  const { filename, originalname } = req.file;

  const uuid = path.basename(filename, path.extname(originalname));

  const { id } = req.params;

  await dbClient.query(`UPDATE players SET avatar = $1 WHERE id = $2`, [
    uuid,
    id,
  ]);
  res.send("single file uploaded");
});

router.get("/player/:id", async (req, res) => {
  const id = req.params.id;
  const data = await dbClient.query(
    `SELECT name, position, clubName, avatar FROM players WHERE id = $1`,
    [id]
  );
  res.send({ data: data.rows });
});

module.exports = router;
