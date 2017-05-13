var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/constructor-results.sql').toString()
  // Deletes ALL existing entries
  return knex('constructorResults').del()
    .then(() => {
      return knex('constructorResults')
      .then(() => knex.raw(sql))
    });
};
