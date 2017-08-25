'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.alterTable('user', function (table) {
	  table.integer('status_kalender').unsigned();
	}),

	knex.schema.alterTable('pasangan_ta', function (table) {
	  table.integer('status_penjadwalan').unsigned();
	}),

	knex.schema.alterTable('pasangan_kp', function (table) {
	  table.integer('status_penjadwalan').unsigned();
	}),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('user', function (table) {
	  table.dropColumn('status_kalender')
	}),

	knex.schema.alterTable('pasangan_ta', function (table) {
	  table.dropColumn('status_penjadwalan')
	}),

	knex.schema.alterTable('pasangan_kp', function (table) {
	  table.dropColumn('status_penjadwalan')
	}),
  ]);
};
