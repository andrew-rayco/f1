
exports.up = function(knex, Promise) {
  return knex.schema.createTable('drivers', function (table) {
    table.increments('driverId').primary()
    table.string('driverRef')
    table.integer('number')
    table.string('code')
    table.string('forename')
    table.string('surname')
    table.date('dob')
    table.string('nationality')
    table.string('url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drivers')
};
