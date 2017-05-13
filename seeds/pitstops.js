var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/pitstops.sql').toString()
  // Deletes ALL existing entries
  return knex('pitStops').del()
    .then(() => {
      return knex('pitStops')
      .then(() => knex.raw(sql))
    });
};
