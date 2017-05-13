var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/status.sql').toString()
  // Deletes ALL existing entries
  return knex('status').del()
    .then(() => {
      return knex('status')
      .then(() => knex.raw(sql))
    });
};
