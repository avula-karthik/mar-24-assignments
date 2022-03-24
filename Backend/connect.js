const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'westsidenode',
    password: 'karthik',
});
console.log(connection);
module.exports = connection;
