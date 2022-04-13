const express = require("express");

const app = express();
require("dotenv").config()


const pg = require("./dbs/pg")

app.get('/customersPostgres', async function (req, res) {
   res.send(await pg.q("select * from Customers",[]))
});



/***************
 * 
 * orcl
 */
const dbOracle = require('./dbs/oracledb.js')
app.get("/customersOracle", async (req, res) => {
    console.log("q")
    res.send(await dbOracle.q('select * from customers where rownum < 2', []))
})


/***************
 * 
 * mysql
 */

const mysqldb = require("./dbs/mysqldb")

app.get("/customersMysql", async (req, res) => {
    mysqldb.q("select * from Customers").then(r => {
        res.send(r)
    }).catch(e => {
        res.send({ e })
    })
})

app.get("/customersMysql2", async (req, res) => {
    try {
        res.send(await mysqldb.q("select * from Customers"))
    } catch (error) {
        res.send({ error })
    }

});

/*************
 *  sqlserver
 * 
 */
app.get('/customersSQLSERVER', async function (req, res) {
  const sqlserver = require('./dbs/sqlserver')
  res.send(await sqlserver.q("select * from customers"))
   
});
/****************
 * rutas
 */
app.get("/ping", (req, res) => {
    res.send(new Date().toISOString())
})



app.listen(5555, () => {
    console.log("listen")
})