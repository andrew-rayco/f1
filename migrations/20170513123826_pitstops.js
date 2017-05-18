
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pitstops', function (table) {
    table.integer('raceId')
    table.integer('driverId')
    table.integer('stop')
    table.integer('lap')
    table.time('time')
    table.string('duration')
    table.integer('milliseconds')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pitstops')
};
