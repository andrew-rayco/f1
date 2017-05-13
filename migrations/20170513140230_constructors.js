
exports.up = function(knex, Promise) {
  return knex.schema.createTable('constructors', function (table) {
    table.increments('constructorId').primary()
    table.string('constructorRef')
    table.string('name')
    table.string('nationality')
    table.string('url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('constructors')
};
