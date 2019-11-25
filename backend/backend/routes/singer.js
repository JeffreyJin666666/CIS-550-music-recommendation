var express = require('express');
var router = express.Router();
var db = require('../database');
/* GET users listing. */
router.get('/', function(req, res) {
  db.getBestSinger(

    (err, result)=>{
      if(err){
        //TODO add error handler
        console.log("error")
        return
      }else{
        console.log(result);
        res.send(result);
      }
    }
  )
});


router.get('/versatile', function(req, res) {
  db.getVersatileSinger(

    (err, result)=>{
      if(err){
        //TODO add error handler
        console.log("error")
        return
      }else{
        console.log(result);
        res.send(result);
      }
    }
  )
});


module.exports = router;
