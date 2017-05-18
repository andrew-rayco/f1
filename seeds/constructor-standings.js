var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/constructor-standings.sql').toString()
  // Deletes ALL existing entries
  return knex('constructorstandings').del()
    .then(() => {
      return knex('constructorstandings')
      .then(() => knex.raw(sql))
    });
};
