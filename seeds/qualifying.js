var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/qualifying.sql').toString()
  // Deletes ALL existing entries
  return knex('qualifying').del()
    .then(() => {
      return knex('qualifying')
      .then(() => knex.raw(sql))
    });
};
