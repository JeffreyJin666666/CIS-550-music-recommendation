

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


function handleGenerateSearchQuery(params){
    query =  "";
    if(params.search_type === 'song'){
        query = `SELECT song.artist_name, song.duration, song.name, song.rating, song.year, singer.country, singer.sexuality, genre.genre_name FROM song JOIN singer ON song.artist = singer.artist_id JOIN genre ON genre.genre_id = song.genre WHERE song.year >= ` + parseInt(params.from_year) + ` AND song.year <= ` + parseInt(params.to_year)   + `AND song.rating = ` + params.song_rating
        if(params.search_key !== ""){
            query +=  ` AND song.name = '` + params.search_key + `'`
        }

        if(params.genre !== ""){
            query +=  ` AND genre.genre_name = '` + params.genre + `'`
        }

    }else{
        query =`SELECT song.artist_name, song.duration, song.name, song.rating, song.year, singer.country, singer.sexuality, genre.genre_name FROM song JOIN singer ON song.artist = singer.artist_id JOIN genre ON genre.genre_id = song.genre WHERE song.year >= ` + parseInt(params.from_year) + ` AND song.year <= ` + parseInt(params.to_year)   + `AND song.rating = ` + params.song_rating
        if(params.search_key !== ""){
            query += ` AND song.artist_name = '` + params.search_key + `'`
        }
        if(params.genre !== ""){
            query +=  ` AND genre.genre_name = '` + params.genre + `'`
        }
    }
    return query
}

function handleReturnQuickEntry(index){
    let querys = [
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
        `,`
        WITH Genres_num AS 
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
        `,`
        WITH Location_num AS
        (SELECT singer.country, COUNT(singer.country) as num
        FROM song LEFT OUTER JOIN singer ON song.artist = singer.artist_id
        WHERE singer.country IS NOT NULL
        GROUP BY singer.country
        )
        SELECT singer.country, Location_num.num, artist_mbtag.mbtag
        FROM Location_num JOIN singer ON Location_num.country = singer.country JOIN artist_mbtag ON singer.artist_id = artist_mbtag.artist_id
        WHERE num`
    ]
    return querys[index]
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

