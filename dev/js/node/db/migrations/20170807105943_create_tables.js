'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('user', function (table) {
			table.increments();
			table.string('nama');
			table.string('email');
			table.string('token');
			table.integer('peran');
			table.string('NIM');
			table.timestamps();
		}),

		knex.schema.createTableIfNotExists('pasangan_kp', function (table) {
			table.increments();
			table.string('topik')
			table.timestamps();
		}),

		knex.schema.createTableIfNotExists('anggota_pasangan_kp', function (table) {
			table.increments();
			table.integer('user_id').unsigned();
			table.integer('peran_pasangan');
			table.integer('pasangan_id').unsigned();
			table.timestamps();
		}),

		knex.schema.createTableIfNotExists('pasangan_ta', function (table) {
			table.increments();
			table.string('nama')
			table.string('topik')
			table.timestamps();
		}),

		knex.schema.createTableIfNotExists('anggota_pasangan_ta', function (table) {
			table.increments();
			table.integer('user_id').unsigned();
			table.integer('peran_pasangan');
			table.integer('pasangan_id').unsigned();
			table.timestamps();
		}),





	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('user'),
		knex.schema.dropTableIfExists('pasangan_kp'),
		knex.schema.dropTableIfExists('anggota_pasangan_kp'),
		knex.schema.dropTableIfExists('pasangan_ta'),
		knex.schema.dropTableIfExists('anggota_pasangan_ta'),
	]);
};
