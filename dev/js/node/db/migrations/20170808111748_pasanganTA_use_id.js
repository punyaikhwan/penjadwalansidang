
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('pasangan_ta', function (table) {
  	table.dropColumn('nama');
  	table.integer('mahasiswa_id').unsigned();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('pasangan_ta', function (table) {
  	table.dropColumn('mahasiswa_id');
  	table.string('nama')
  })
};
