// part of the great api experiment of 1 July, 2017
// var express = require('express')
// var router = express.Router()

var request = require('superagent')

function getData(callback) {
  console.log('hitting the api call')
  request
    .get('http://ergast.com/api/f1/seasons.json')
    .end((err, result) => {
      if(err) {
        console.log(err)
      } else {
        console.log(result.body)
        callback(result.body)
      }
  })
}


// example json api
// router.get('/', (req, res) => {
//   var db = req.app.get('db')
//   db('seasons')
//     .orderBy('year', 'asc')
//     .then((seasons) => {
//     res.json(seasons)
//   })
// })


module.exports = {getData}
