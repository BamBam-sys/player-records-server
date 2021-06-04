const dbClient = require("../database");

//create user table
dbClient.query("ALTER TABLE players ADD COLUMN avatar UUID");
