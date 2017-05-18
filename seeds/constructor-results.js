var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/constructor-results.sql').toString()
  // Deletes ALL existing entries
  return knex('constructorresults').del()
    .then(() => {
      return knex('constructorresults')
      .then(() => knex.raw(sql))
    });
};
