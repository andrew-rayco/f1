
exports.up = function(knex, Promise) {
  return knex.schema.createTable('qualifying', function (table) {
    table.increments('qualifyId').primary()
    table.integer('raceId')
    table.integer('driverId')
    table.integer('constructorId')
    table.integer('number')
    table.integer('position')
    table.string('q1')
    table.string('q2')
    table.string('q3')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('qualifying')
};
