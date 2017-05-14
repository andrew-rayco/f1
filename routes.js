var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  var db = req.app.get('db')
  db('circuits').then(function(circuits) {
    console.log(circuits)
    res.render('index', {circuits})
  })

})

module.exports = router
