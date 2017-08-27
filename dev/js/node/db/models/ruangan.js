let helper = require('./db.js');
require('./event_ruangan.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'ruangan',
    hasTimestamps: true,
    event: function() {
	    return this.hasMany('EventRuangan', 'room_id');
	},
});	
model = helper.bookshelf.model('Ruangan', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated: "event"}).then(function(data){
// 	console.log("==user=================")
// 	console.log(JSON.stringify(data))
// })



