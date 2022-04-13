const oracledb = require('oracledb');

try {
    oracledb.initOracleClient({ libDir: 'C:\\Users\\jviejo\\Downloads\\instantclient-basiclite-windows.x64-21.3.0.0.0\\instantclient_21_3' });
} catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
}
var pool = null
async function getPool(con) {
    return new Promise(async (resolve, reject) => {
        if (pool) resolve(pool)
        try {
            console.log("obtengo pool")
            pool = await oracledb.createPool(con)
            resolve(pool)
        } catch (error) {
            reject(error)
        }
    });
}

async function q(sql, parametros) {
    console.log(sql)
    let connection;

    try {
        await getPool({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.ORACLE_CN,
            poolAlias: "curso"
        })

        connection = await oracledb.getConnection("curso");
        
        const result = await connection.execute(
            sql,
            parametros,  // bind value for :id
            {
                outFormat: oracledb.OBJECT
            },
        );
        return (result.rows);

    } catch (err) {
        console.log(err)
        return err;
    } finally {

        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return err;
            }
        }
    }
}

module.exports = {
    q
}