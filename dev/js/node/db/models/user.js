let helper = require('./db.js');

Model = helper.bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: true
});	
model = helper.bookshelf.model('User', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll().then(function(data){
// 	console.log("==user=================")
// 	console.log(JSON.stringify(data))
// })



