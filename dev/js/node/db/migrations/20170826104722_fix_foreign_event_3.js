
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('anggota_event', function (table) {
            table.foreign('pasangan_id').references('id').inTable('event').onUpdate('restrict').onDelete('cascade');
          })
    ]);
  
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('anggota_event', function (table) {
          table.dropForeign('pasangan_id');
        })
      ]);
};

