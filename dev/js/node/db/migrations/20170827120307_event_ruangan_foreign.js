
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('event_ruangan', function (table) {
            table.foreign('room_id').references('id').inTable('ruangan').onUpdate('restrict').onDelete('cascade');
          })
    ]);
  
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('event_ruangan', function (table) {
          table.dropForeign('room_id');
        })
      ]);
};

