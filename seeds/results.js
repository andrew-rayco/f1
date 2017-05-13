var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/results.sql').toString()
  // Deletes ALL existing entries
  return knex('results').del()
    .then(() => {
      return knex('results')
      .then(() => knex.raw(sql))
    });
};
