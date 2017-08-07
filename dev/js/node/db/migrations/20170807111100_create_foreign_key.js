'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.alterTable('anggota_pasangan_kp', function (table) {
	  table.foreign('user_id').references('id').inTable('user').onUpdate('restrict').onDelete('cascade');
	  table.foreign('pasangan_id').references('id').inTable('pasangan_kp').onUpdate('restrict').onDelete('cascade');
	}),

	knex.schema.alterTable('anggota_pasangan_ta', function (table) {
	  table.foreign('user_id').references('id').inTable('user').onUpdate('restrict').onDelete('cascade');
	  table.foreign('pasangan_id').references('id').inTable('pasangan_ta').onUpdate('restrict').onDelete('cascade');
	}),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('anggota_pasangan_kp', function (table) {
      table.dropForeign('user_id');
      table.dropForeign('pasangan_id');
    }),

    knex.schema.alterTable('anggota_pasangan_ta', function (table) {
      table.dropForeign('user_id');
      table.dropForeign('pasangan_id');
    }),
  ]);
};
