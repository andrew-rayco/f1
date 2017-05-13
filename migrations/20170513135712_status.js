
exports.up = function(knex, Promise) {
  return knex.schema.createTable('status', function (table) {
    table.integer('statusId').primary()
    table.string('status')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('status')
};
