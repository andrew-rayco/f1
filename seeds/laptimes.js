var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/laptimes.sql').toString()
  // Deletes ALL existing entries
  return knex('laptimes').del()
    .then(() => {
      return knex('laptimes')
      .then(() => knex.raw(sql))
    });
};
