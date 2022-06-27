const { Pool, Client } = require('pg');

// Connection DB

const conn = new Client({
    user: "postgres",
    host: "localhost",
    database: "hospital",
    password: "admin",
    port: 5555
})

// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "system_tickets_rdg"
// });

conn.connect();


module.exports = conn;