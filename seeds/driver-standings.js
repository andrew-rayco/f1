var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/driver-standings.sql').toString()
  // Deletes ALL existing entries
  return knex('driverStandings').del()
    .then(() => {
      return knex('driverStandings')
      .then(() => knex.raw(sql))
    });
};
