'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTableIfNotExists('anggota_event', function (table) {
      table.increments();
      table.integer('user_id').unsigned()
      table.integer('peran_pasangan').unsigned()
      table.integer('pasangan_id').unsigned()
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('anggota_event'),
  ]);
};
