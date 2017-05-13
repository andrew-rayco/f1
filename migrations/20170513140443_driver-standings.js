
exports.up = function(knex, Promise) {
  return knex.schema.createTable('driverStandings', function (table) {
    table.increments('driverStandingsId').primary()
    table.integer('raceId')
    table.integer('driverId')
    table.float('points')
    table.integer('position')
    table.string('positionText')
    table.integer('wins')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('driverStandings')
};
