// part of the great api experiment of 1 July, 2017
var express = require('express')
var router = express.Router()

var request = require('superagent')

router.get('/', (req, res) => {
  request
    .get('http://ergast.com/api/f1/seasons')
    .end((err, result) => {
      if(err) {
        console.log(err)
      } else {
        console.log(Object.keys(res))
        console.log(res.req)
      }
    })
})

// example json api
// router.get('/', (req, res) => {
//   var db = req.app.get('db')
//   db('seasons')
//     .orderBy('year', 'asc')
//     .then((seasons) => {
//     res.json(seasons)
//   })
// })

// experiment with external api
// router.get('/', (req, res) => {
//   var ourData;
//   var ourRequest = new XMLHttpRequest();
//   ourRequest.open("GET", "https://eda-te-reo.herokuapp.com/api/proverbs", false);
//   ourRequest.onload= function () {
//     ourData = JSON.parse(ourRequest.responseText);
//   };
//   ourRequest.send();
// })

module.exports = router
