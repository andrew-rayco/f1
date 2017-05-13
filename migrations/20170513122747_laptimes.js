
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lapTimes', function (table) {
    table.integer('raceId')
    table.integer('driverId')
    table.integer('lap')
    table.integer('position')
    table.string('time')
    table.integer('milliseconds')
    table.primary('raceId', 'driverId', 'lap');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lapTimes')
};
