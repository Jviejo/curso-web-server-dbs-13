const { Pool } = require('pg');
const util = require("util")

const poolPg = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: 'postgres',
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})


async function q(sql, parametros) {
    return new Promise(async (resolve, reject) => {
       
        poolPg.connect((err, client, done) => {
            if (err) reject(err)
            client.query(sql, parametros, (err, result) => {
                done()
                if (err) {
                    reject(err)
                } else {
                    resolve(result.rows)
                }
            })
        });
    })
}


module.exports = {
    q
}