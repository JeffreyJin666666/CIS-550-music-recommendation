

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
            `Select *
FROM (
select DISTINCT song.name, song.artist_name, song.rating, song.year, song.duration, genre.genre_name
FROM song JOIN genre ON song.genre = genre.genre_id
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

function handleGenerateSearchQuery(params){
    query =  "";
    if(params.search_type === 'song'){
        query = `SELECT song.artist_name, song.duration, song.name, song.rating, song.year, singer.country, singer.sexuality, genre.genre_name FROM song LEFT OUTER JOIN singer ON song.artist = singer.artist_id JOIN genre ON genre.genre_id = song.genre WHERE song.year >= ` + parseInt(params.from_year) + ` AND song.year <= ` + parseInt(params.to_year)   + `AND song.rating = ` + params.song_rating
        if(params.search_key !== ""){
            query +=  ` AND song.name LIKE '%` + params.search_key + `%'`
        }

        if(params.genre !== ""){
            query +=  ` AND genre.genre_name = '` + params.genre + `'`
        }

    }else{
        query =`SELECT song.artist_name, song.duration, song.name, song.rating, song.year, singer.country, singer.sexuality, genre.genre_name FROM song LEFT OUTER JOIN singer ON song.artist = singer.artist_id JOIN genre ON genre.genre_id = song.genre WHERE song.year >= ` + parseInt(params.from_year) + ` AND song.year <= ` + parseInt(params.to_year)   + `AND song.rating = ` + params.song_rating
        if(params.search_key !== ""){
            query += ` AND song.artist_name LIKE '%` + params.search_key + `%'`
        }
        if(params.genre !== ""){
            query +=  ` AND genre.genre_name = '` + params.genre + `'`
        }
    }
    return query
}

function handleReturnQuickEntry(index){


    const query = [

        `SELECT * FROM (SELECT singer.name, COUNT (song.name) AS num FROM singer JOIN song ON singer.artist_id = song.artist GROUP BY singer.name ORDER BY num DESC) WHERE ROWNUM = 1`,

        `WITH max_duration AS (SELECT MAX(song.duration) AS max FROM song) SELECT song.name, song.duration, song.rating, song.year, song.artist_name FROM song JOIN max_duration ON song.duration = max_duration.max`,

        `SELECT song.name, song.rating, song.year, song.artist_name, song.duration FROM song WHERE song.year = (SELECT MIN(song.year) AS year FROM song)`,

        `WITH Best AS \
        (SELECT DISTINCT song.name \
        FROM song \
        WHERE rating = '5'), Worst AS \
(SELECT DISTINCT song.name \
FROM song \
WHERE rating = '1'), Worst_res AS (SELECT DISTINCT song.artist_name, COUNT(song.name) AS num_worst \
FROM song JOIN Worst ON song.name = Worst.name \
WHERE song.rating = 1 \
GROUP BY song.artist_name \
ORDER BY song.artist_name), Best_res AS (SELECT DISTINCT song.artist_name, COUNT(song.name) AS num_best \
FROM song JOIN Best ON song.name = Best.name \
WHERE song.rating = 5 \
GROUP BY song.artist_name \
ORDER BY song.artist_name) \
SELECT Best_res.artist_name, Best_res.num_best, Worst_res.num_worst \
FROM Best_res JOIN Worst_res ON best_res.artist_name = worst_res.artist_name`,

        'WITH Genres_num AS \
        (SELECT song.artist, song.artist_name, COUNT (DISTINCT artist_mbtag.mbtag) AS num1 \
        FROM song JOIN artist_mbtag ON song.artist = artist_mbtag.artist_id \
        GROUP BY song.artist, song.artist_name \
        HAVING COUNT (DISTINCT mbtag) >= 12 \
        ), Songs_num AS \
        (SELECT song.artist, song.artist_name, COUNT (DISTINCT song.name) AS num2 \
        FROM song LEFT OUTER JOIN singer ON song.artist = singer.artist_id \
        GROUP BY song.artist, song.artist_name \
        HAVING COUNT (DISTINCT song.name) >= 120 \
        ) \
        SELECT DISTINCT song.artist_name, Genres_num.num1, Songs_num.num2 \
        FROM song JOIN Genres_num ON song.artist = Genres_num.artist JOIN Songs_num ON song.artist = Songs_num.artist \
        ORDER BY Genres_num.num1 DESC, Songs_num.num2 DESC',

        'SELECT * \
        FROM ( SELECT singer.country, COUNT(singer.country) as num \
        FROM singer \
        WHERE singer.country IS NOT NULL \
        GROUP BY singer.country \
        ORDER BY num DESC ) \
        WHERE ROWNUM = 1',

        'WITH Location_num AS \
        (SELECT singer.country, COUNT(singer.country) as num \
        FROM song JOIN singer ON song.artist = singer.artist_id \
        WHERE singer.country IS NOT NULL \
        GROUP BY singer.country \
        ) \
        SELECT * \
        FROM ( SELECT singer.country, Location_num.num \
        FROM Location_num JOIN singer ON Location_num.country = singer.country \
        ORDER BY Location_num.num DESC ) \
        WHERE ROWNUM = 1',

        'WITH year_genre AS \
        (SELECT song.year, song.genre, COUNT(DISTINCT song.name) as num \
        FROM song \
        GROUP BY song.year, song.genre), max_genre AS ( \
        SELECT year_genre.year, MAX(num) AS num \
        FROM year_genre \
        GROUP BY year_genre.year \
        ) \
        SELECT DISTINCT year_genre.year, genre.genre_name, max_genre.num \
        FROM year_genre JOIN max_genre ON year_genre.year = max_genre.year JOIN genre ON genre.genre_id = year_genre.genre \
        WHERE year_genre.num = max_genre.num \
        ORDER BY year_genre.year',
    ];
    return query[index]
}




exports.getSearchResult= async function(params, callback) {
    console.log('query is', params, params.genre, handleGenerateSearchQuery(params))
    let query = handleGenerateSearchQuery(params)
    let connection;

    try {
        connection = await  oracledb.getConnection(  {
            user          : "admin",
            password      : "cis550blah",
            connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
        });

        connection.execute(query, (err, result)=>{
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



exports.getQuickEntry= async function(params, callback) {
    let queryIndex = params.index

    let connection;

    try {
        connection = await  oracledb.getConnection(  {
            user          : "admin",
            password      : "cis550blah",
            connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
        });

        connection.execute(handleReturnQuickEntry(queryIndex), (err, result)=>{
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

