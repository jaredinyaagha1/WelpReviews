const mysql = require("mysql2");
const fs = require("fs");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const seedQuery = fs.readFileSync("db/seed.sql", {
    encoding: "utf-8",
})

const connection = mysql.createConnection({})