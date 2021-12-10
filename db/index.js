const mysql = require("mysql2");
const fs = require("fs");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const seedQuery = fs.readFileSync("db/seed.sql", {
    encoding: "utf-8",
})

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
});

connection.connect();

const psw = Math.random().toString(36).substring(2);
const hash = bcrypt.hashSync(psw, 10);

console.log("Running SQL seed. . . ");

connection.query(seedQuery, [hash], err => {
    if (err) {
        throw err
    }

    console.log("SQL seed completed! Password for initial admin account: " + psw)
    connection.end()
})