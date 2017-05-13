var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/races.sql').toString()
  // Deletes ALL existing entries
  return knex('races').del()
    .then(() => {
      return knex('races')
      .then(() => knex.raw(sql))
    });
};
