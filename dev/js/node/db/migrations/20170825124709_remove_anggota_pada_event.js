
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('event', function (table) {
  	table.dropColumn('pasangan_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('event', function (table) {
  	table.integer('pasangan_id').unsigned();
  })
};
