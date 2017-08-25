
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('calendar_list_user', function (table) {
            table.foreign('user_id').references('id').inTable('user').onUpdate('restrict').onDelete('cascade');
          })
    ]);
  
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('calendar_list_user', function (table) {
          table.dropForeign('user_id');
        })
      ]);
};

