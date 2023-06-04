const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ngatini12.,',
    database: 'eduwork-cruds'
});

module.exports = connection;