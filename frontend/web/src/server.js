var express = require('express');
var router = express.Router();
var path = require('path');


/* ----- Connects to your mySQL database ----- */
const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


let connection;

try {
    connection =  oracledb.getConnection(  {
        user          : "admin",
        password      : "cis550blah",
        connectString : "cis550project.cwunoqbz1ywm.us-east-2.rds.amazonaws.com/CIS550PJ"
    });

} catch (err) {
    console.error(err);
}


/* ------------------------------------------------ */
/* ----- Routers to handle data requests ----- */
/* ------------------------------------------------ */


router.get('/song', function(req, res) {
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre ORDER BY song.year, song.artist_name;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});


router.get('/genres/:g', function(req, res) {
  console.log(req.params);
  var query = `
    SELECT name, artist_name, year, rating FROM (SELECT DISTINCT name, artist_name, year, rating FROM song ORDER BY artist_name) res WHERE ROWNUM <= 100;`;

  console.log(result.rows);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});




router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre ORDER BY genre.genre_name;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});



router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre ORDER BY song.year, song.artist_name;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});



router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre ORDER BY song.artist_name;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});




router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre WHERE genre.genre_name =` + req.params.given_genre + ` ;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});



router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre WHERE song.year = ` + req.params.given_year + ` ;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});



router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre WHERE song.artist_name = ` + req.params.given_artist + ` ;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});




router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.name, song.artist_name, song.year, song.rating, genre.genre_name FROM song JOIN genre ON genre.genre_id = song.genre WHERE song.artist_name = ` + req.params.given_artist + ` ;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});



router.get('/genres', function(req, res) {
  console.log(req.params);
  var query = `SELECT DISTINCT song.artist_name, song.name, song.year, song.rating FROM song WHERE song.name = ` + req.params.song_name + ` AND song.artist_name = ` +  req.params.given_artist + ` ;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});







//
//
// /* ----- Q3 (Best Of Decades) ----- */
//
// router.get('/decades', function(req, res) {
//   console.log(req)
//   var query = `
//     SELECT DISTINCT (FLOOR(year/10)*10) AS decade
//     FROM (
//       SELECT DISTINCT release_year as year
//       FROM Movies
//       ORDER BY release_year
//     ) y
//   `;
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       console.log(rows);
//       res.json(rows);
//     }
//   });
// });
//
// router.get('/decades/:selectedDecade', function(req, res) {
//   console.log(req.params);
//   var query = `
//     WITH DISTINCT_GENRE AS (
//       SELECT DISTINCT G2.genre
//       FROM Genres G2
//     ), DECADE_MOVIE AS (
//       SELECT *
//       FROM Movies M
//       WHERE M.release_year >= ` + req.params.selectedDecade + `
//       AND M.release_year <= `  + req.params.selectedDecade.substring(0,3)+ '9' + `
//     )
//     SELECT G.genre, DM.title, DM.vote_count, DM.release_year
//     FROM Genres G, DECADE_MOVIE DM, DISTINCT_GENRE DG
//     WHERE DG.genre = G.genre
//     AND DM.id = G.movie_id
//     AND DM.vote_count = (
//       SELECT MAX(DM1.vote_count)
//       FROM DECADE_MOVIE DM1, Genres G1
//       WHERE G1.genre = DG.genre
//       AND DM1.id = G1.movie_id
//     )
//     ORDER BY DG.genre
//     ;
//   `;
//   console.log('best of ', query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//
//       res.json(rows);
//     }
//   });
// });
//
//
//

/* ----- Bonus (Posters) ----- */



/* General Template for GET requests:

router.get('/routeName/:customParameter', function(req, res) {
  // Parses the customParameter from the path, and assigns it to variable myData
  var myData = req.params.customParameter;
  var query = '';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // Returns the result of the query (rows) in JSON as the response
      res.json(rows);
    }
  });
});
*/


module.exports = router;
