let helper = require('./db.js');
require('./pasangan_ta.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: true,
    calendar_list: function() {
	    return this.hasMany('CalendarList', 'user_id');
	},
	TA: function() {
	    return this.hasOne('PasanganTA', 'mahasiswa_id');
	},
});	
model = helper.bookshelf.model('User', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated: "calendar_list"}).then(function(data){
// 	console.log("==user=================")
// 	console.log(JSON.stringify(data))
// })



