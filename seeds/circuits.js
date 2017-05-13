var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/circuits.sql').toString()
  // Deletes ALL existing entries
  return knex('circuits').del()
    .then(() => {
      return knex('circuits')
      .then(() => knex.raw(sql))
    });
};
