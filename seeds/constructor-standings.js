var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/constructor-standings.sql').toString()
  // Deletes ALL existing entries
  return knex('constructorStandings').del()
    .then(() => {
      return knex('constructorStandings')
      .then(() => knex.raw(sql))
    });
};
