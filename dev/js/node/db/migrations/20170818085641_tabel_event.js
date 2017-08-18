'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('event', function (table) {
			table.increments();
			table.integer('event_id').unsigned();
			table.integer('tipe_event').unsigned();
			table.integer('pasangan_id').unsigned();
			table.string('topik');
			table.integer('room_id').unsigned();
			table.dateTime('start');
			table.dateTime('end');
			table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('event'),
	]);
};
