let helper = require('./db.js');

Model = helper.bookshelf.Model.extend({
    tableName: 'event_ruangan',
    hasTimestamps: true,
});	
model = helper.bookshelf.model('EventRuangan', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated: "calendar_list"}).then(function(data){
// 	console.log("==user=================")
// 	console.log(JSON.stringify(data))
// })



