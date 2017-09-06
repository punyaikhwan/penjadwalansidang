
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('event', function (table) {
          table.dropForeign('room_id');
        })
    ]);
  
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('event', function (table) {
            table.foreign('room_id').references('id').inTable('user').onUpdate('restrict').onDelete('cascade');
        })
    ])
};

