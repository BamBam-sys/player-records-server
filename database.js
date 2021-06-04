const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "proverbs",
  host: "localhost",
  database: "player-records",
  port: 5432,
});

client.connect();

module.exports = client;
