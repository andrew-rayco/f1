
exports.up = function(knex, Promise) {
  return knex.schema.createTable('constructorresults', function (table) {
    table.increments('constructorResultsId').primary()
    table.integer('raceId')
    table.integer('constructorId')
    table.float('points')
    table.string('status')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('constructorresults')
};
