var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/constructors.sql').toString()
  // Deletes ALL existing entries
  return knex('constructors').del()
    .then(() => {
      return knex('constructors')
      .then(() => knex.raw(sql))
    });
};
