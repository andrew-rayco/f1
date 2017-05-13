var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/laptimes.sql').toString()
  // Deletes ALL existing entries
  return knex('lapTimes').del()
    .then(() => {
      return knex('lapTimes')
      .then(() => knex.raw(sql))
    });
};
