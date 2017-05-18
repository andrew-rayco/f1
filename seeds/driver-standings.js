var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/driver-standings.sql').toString()
  // Deletes ALL existing entries
  return knex('driverstandings').del()
    .then(() => {
      return knex('driverstandings')
      .then(() => knex.raw(sql))
    });
};
