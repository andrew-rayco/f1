var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/seasons.sql').toString()
  // Deletes ALL existing entries
  return knex('seasons').del()
    .then(() => {
      return knex('seasons')
      .then(() => knex.raw(sql))
    });
};
