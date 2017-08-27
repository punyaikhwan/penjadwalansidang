let helper = require('./db.js');
require('./user.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'calendar_list_user',
    hasTimestamps: true,
    dosen: function() {
	    return this.belongsTo('User', 'user_id')
    },



});	
model = helper.bookshelf.model('CalendarList', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated: 'pembimbing.user'}).then(function(data){
// 	console.log(JSON.stringify(data))
// })




