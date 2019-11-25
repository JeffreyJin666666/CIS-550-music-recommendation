

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
            `SELECT DISTINCT genre.genre_name FROM genre`
        );
        output = []
        result.rows.forEach(x =>{
            output.push(x.GENRE_NAME)
        })
        console.log(output);

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

