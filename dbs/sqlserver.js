const mssql = require('mssql')
const sqlConfig = {
    user: process.env.SQLSERVER_USER, 
    password: process.env.SQLSERVER_PASSWORD, 
    database: process.env.SQLSERVER_DATABASE, 
    server: process.env.SQLSERVER_HOST, 
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
async function q(sql, params) {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await mssql.connect(sqlConfig)
        const result = await mssql.query(`select * from Customers`)
        return result;
    } catch (err) {
        return {err:JSON.stringify(err)}
    }
}


module.exports = {
    q
}