const dbClient = require("../database");

//create user table
dbClient.query(
  "CREATE TABLE players (id SERIAL PRIMARY KEY NOT NULL, name VARCHAR(255), position VARCHAR(255), clubName VARCHAR(255))"
);
