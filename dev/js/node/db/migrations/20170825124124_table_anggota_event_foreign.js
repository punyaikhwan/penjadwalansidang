'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.alterTable('anggota_event', function (table) {
	  table.foreign('user_id').references('id').inTable('user').onUpdate('restrict').onDelete('cascade');
	}),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('anggota_event', function (table) {
      table.dropForeign('user_id');
    }),
  ]);
};
