'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
        knex.schema.createTableIfNotExists('calendar_list_user', function (table) {
			table.increments();
            table.integer('user_id', 10).unsigned();
			table.string('calendar_id');
			table.string('calendar_name');
			table.boolean('status');
			table.timestamps();
		}),

	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('calendar_list_user'),
	]);
};
