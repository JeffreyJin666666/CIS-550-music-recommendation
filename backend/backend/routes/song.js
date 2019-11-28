var express = require('express');
var router = express.Router();
var db = require('../database');
/* GET users listing. */
router.get('/', function(req, res) {
  db.getRandomSongs(

    (err, result)=>{
      if(err){
        //TODO add error handler
        console.log("error")
        return
      }else{
        console.log(result);
        res.send(result.rows);
      }
    }
  )
});



module.exports = router;
