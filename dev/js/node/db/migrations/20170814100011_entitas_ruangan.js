
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pasangan_ta', function (table) {
  	table.integer('ruangan_id').unsigned();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pasangan_ta', function (table) {
  	table.dropColumn('ruangan_id').unsigned();
  })
};
