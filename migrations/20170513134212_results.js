
exports.up = function(knex, Promise) {
  return knex.schema.createTable('results', function (table) {
    table.increments('resultId').primary()
    table.integer('raceId')
    table.integer('driverId')
    table.integer('constructorId')
    table.integer('number')
    table.integer('grid')
    table.integer('position')
    table.string('positionText')
    table.integer('positionOrder')
    table.float('points')
    table.integer('laps')
    table.string('time')
    table.integer('milliseconds')
    table.integer('fastestLap')
    table.integer('rank')
    table.string('fastestLapTime')
    table.string('fastestLapSpeed')
    table.integer('statusId')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('results')
};
