
exports.up = function(knex, Promise) {
  return knex.schema.createTable('seasons', function (table) {
    table.integer('year').primary()
    table.string('url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('seasons')
};
