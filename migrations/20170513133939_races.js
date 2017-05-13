
exports.up = function(knex, Promise) {
  return knex.schema.createTable('races', function (table) {
    table.increments('raceId').primary()
    table.integer('year')
    table.integer('round')
    table.integer('circuitId')
    table.string('name')
    table.date('date')
    table.time('time')
    table.string('url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('races')
};
