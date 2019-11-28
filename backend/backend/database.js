

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


exports.getGenres= async function(callback) {

  let connection;

    try {
        connection = await  oracledb.getConnection(  {
            user          : "admin",
            password      : "cis550blah",
            connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
        });

        connection.execute(
            `SELECT DISTINCT genre.genre_name FROM genre`, (err, result)=>{
                connection.close()
                if(err){
                  console.log("Error");
                  callback(true);
                  return;
                }else{
                  output = []
                  result.rows.forEach(x =>{
                      output.push(x.GENRE_NAME)
                  })
                  callback(false, output);
                }
            }
        );


    } catch (err) {
        console.error(err);
    }
};

exports.getBestSinger= async function(callback) {

  let connection;

    try {
        connection = await  oracledb.getConnection(  {
            user          : "admin",
            password      : "cis550blah",
            connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
        });

        connection.execute(
            `WITH Worst AS
(SELECT *
FROM
(SELECT DISTINCT song.artist, song.artist_name, song.name, song.rating
FROM song
WHERE rating = '5')
), Best AS
(SELECT *
FROM
(SELECT DISTINCT song.artist, song.artist_name, song.name, song.rating
FROM song
WHERE rating = '1')
)
SELECT DISTINCT song.artist_name, song.name, song.rating
FROM song JOIN Worst ON song.artist = Worst.artist JOIN Best ON song.artist = Best.artist
WHERE song.rating = '1' OR song.rating = '5'
ORDER BY song.artist_name
`, (err, result)=>{
                connection.close()
                if(err){
                  console.log("Error");
                  callback(true);
                  return;
                }else{

                  callback(false, result);
                }
            }
        );


    } catch (err) {
        console.error(err);
    }
};

exports.getVersatileSinger= async function(callback) {

  let connection;

    try {
        connection = await  oracledb.getConnection(  {
            user          : "admin",
            password      : "cis550blah",
            connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
        });

        connection.execute(
            `WITH Genres_num AS
            (SELECT song.artist, song.artist_name, COUNT (DISTINCT artist_mbtag.mbtag) AS num1
            FROM song JOIN artist_mbtag ON song.artist = artist_mbtag.artist_id
            GROUP BY song.artist, song.artist_name
            HAVING COUNT (DISTINCT mbtag) >= 5
            ), Songs_num AS
            (SELECT song.artist, song.artist_name, COUNT (DISTINCT song.name) AS num2
            FROM song LEFT OUTER JOIN singer ON song.artist = singer.artist_id
            GROUP BY song.artist, song.artist_name
            HAVING COUNT (DISTINCT song.name) >= 5
            )
            SELECT DISTINCT song.artist_name, Genres_num.num1, Songs_num.num2
            FROM song JOIN Genres_num ON song.artist = Genres_num.artist JOIN Songs_num ON song.artist = Songs_num.artist
            ORDER BY Genres_num.num1 DESC, Songs_num.num2 DESC
`, (err, result)=>{
                connection.close()
                if(err){
                  console.log("Error");
                  callback(true);
                  return;
                }else{

                  callback(false, result);
                }
            }
        );


    } catch (err) {
        console.error(err);
    }
};

exports.getRandomSongs= async function(callback) {

    let connection;

    try {
        connection = await  oracledb.getConnection(  {
            user          : "admin",
            password      : "cis550blah",
            connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
        });

        connection.execute(
            `Select name, artist_name, year, rating
FROM (select DISTINCT *
FROM song
ORDER by dbms_random.value)
WHERE ROWNUM < 101`, (err, result)=>{
                connection.close()
                if(err){
                    console.log("Error");
                    callback(true);
                    return;
                }else{

                    callback(false, result);
                }
            }
        );


    } catch (err) {
        console.error(err);
    }
};

