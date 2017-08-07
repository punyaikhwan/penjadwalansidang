let helper = require('./db.js');

Model = helper.bookshelf.Model.extend({
    tableName: 'anggota_pasangan_kp',
    hasTimestamps: true
});	
model = helper.bookshelf.model('AnggotaPasanganKP', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll().then(function(data){
// 	console.log("==ta=================")
// 	console.log(JSON.stringify(data))
// })




