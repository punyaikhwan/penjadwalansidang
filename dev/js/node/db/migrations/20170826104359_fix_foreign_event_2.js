
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('anggota_event', function (table) {
        	table.integer('pasangan_id').unsigned()
          })
    ]);
  
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('anggota_event', function (table) {
          table.dropCollumn('pasangan_id');
        })
      ]);
};

