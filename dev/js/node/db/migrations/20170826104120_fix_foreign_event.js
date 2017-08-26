
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('anggota_event', function (table) {
        	table.dropColumn('pasangan_id')
          })
    ]);	
  
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('anggota_event', function (table) {
          table.integer('pasangan_id')
        })
      ]);
};

