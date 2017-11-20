// part of the great api experiment of 1 July, 2017
// var express = require('express')
// var router = express.Router()

var request = require('superagent')

function getData(callback) {
  request
    .get('http://ergast.com/api/f1/seasons')
    .end((err, result) => {
      if(err) {
        console.log(err)
      } else {
        callback(result.body)
      }
  })
}

getData(console.log)

// example json api
// router.get('/', (req, res) => {
//   var db = req.app.get('db')
//   db('seasons')
//     .orderBy('year', 'asc')
//     .then((seasons) => {
//     res.json(seasons)
//   })
// })


// module.exports = router
