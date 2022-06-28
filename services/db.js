require("dotenv").config();
const { Pool, Client } = require('pg');

const userDb = process.env.USER_DB;
const hostDb = process.env.HOST_DB;
const bdDb = process.env.DATABASE_DB;
const passwDb = process.env.PASSWORD_DB;
const portDb = process.env.PORT_DB;

// Connection DB

const conn = new Client({
    user: userDb,
    host: hostDb,
    database: bdDb,
    password: passwDb,
    port: portDb
})

// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "system_tickets_rdg"
// });

conn.connect();


module.exports = conn;