var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/pitstops.sql').toString()
  // Deletes ALL existing entries
  return knex('pitstops').del()
    .then(() => {
      return knex('pitstops')
      .then(() => knex.raw(sql))
    });
};
