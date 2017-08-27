'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('ruangan', function (table) {
			table.increments();
			table.integer('nama').unsigned()
			table.timestamps();
		}),

		knex.schema.createTableIfNotExists('event_ruangan', function (table) {
			table.increments();
			table.integer('room_id').unsigned()
			table.string('title')
			table.dateTime('start');
			table.dateTime('end');
			table.timestamps();
		}),
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('event_ruangan'),
		knex.schema.dropTableIfExists('ruangan'),
	]);
};
