

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function run() {

    let connection;

    try {
        connection = await oracledb.getConnection(  {
            user          : "admin",
            password      : "cis550blah",
            connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
        });

        const result = await connection.execute(
            'SELECT singer.artist_id FROM singer ORDER BY RAND() LIMIT 100;'
    );

        console.log(result.rows);

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();

