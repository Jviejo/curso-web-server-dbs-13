const mysql = require("mysql8")
var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'northwind'
});

function q(sql) {
    return new Promise((resolver, reject) => {
        pool.query(sql, function (error, results, fields) {
            if (error) reject(error);
            return resolver(results);
        });
    });
}

module.exports = {
    q
}