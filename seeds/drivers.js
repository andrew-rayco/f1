var fs = require('fs')

exports.seed = function(knex, Promise) {
  var sql = fs.readFileSync('./sql/drivers.sql').toString()
  // Deletes ALL existing entries
  return knex('drivers').del()
    .then(() => {
      return knex('drivers')
      .then(() => knex.raw(sql))
    });
};
