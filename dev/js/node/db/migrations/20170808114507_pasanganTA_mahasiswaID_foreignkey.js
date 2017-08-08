'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.alterTable('pasangan_ta', function (table) {
	  table.foreign('mahasiswa_id').references('id').inTable('user').onUpdate('restrict').onDelete('cascade');
	}),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('anggota_pasangan_ta', function (table) {
      table.dropForeign('mahasiswa_id');
    }),
  ]);
};
