
exports.up = function(knex, Promise) {
  return knex.schema.createTable('constructorstandings', function (table) {
    table.increments('constructorStandingsId').primary()
    table.integer('raceId')
    table.integer('constructorId')
    table.float('points')
    table.integer('position')
    table.string('positionText')
    table.integer('wins')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('constructorstandings')
};
