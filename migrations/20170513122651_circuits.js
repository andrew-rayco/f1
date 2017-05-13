
exports.up = function(knex, Promise) {
  return knex.schema.createTable('circuits', function (table) {
    table.increments('circuitId').primary()
    table.string('circuitRef')
    table.string('name')
    table.string('location')
    table.string('country')
    table.float('lat')
    table.float('lng')
    table.integer('alt')
    table.string('url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('circuits')
};
