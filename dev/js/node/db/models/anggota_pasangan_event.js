let helper = require('./db.js');
require('./event.js')
require('./user.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'anggota_event',
    hasTimestamps: true,
    kelompok: function() {
	    return this.belongsTo('Event', 'pasangan_id')
	},
	user: function() {
	    return this.belongsTo('User')
	}
});	
model = helper.bookshelf.model('AnggotaEvent', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll().then(function(data){
// 	console.log("==ta=================")
// 	console.log(JSON.stringify(data))
// })




