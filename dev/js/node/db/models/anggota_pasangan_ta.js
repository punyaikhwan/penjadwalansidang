let helper = require('./db.js');

Model = helper.bookshelf.Model.extend({
    tableName: 'anggota_pasangan_ta',
    hasTimestamps: true
});	
model = helper.bookshelf.model('AnggotaPasanganTA', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll().then(function(data){
// 	console.log("==ta=================")
// 	console.log(JSON.stringify(data))
// })




