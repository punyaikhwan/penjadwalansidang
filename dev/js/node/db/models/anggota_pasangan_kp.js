let helper = require('./db.js');
require('./pasangan_kp.js')
require('./user.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'anggota_pasangan_kp',
    hasTimestamps: true,
    kelompok: function() {
	    return this.belongsTo('PasanganKP')
	},
	user: function() {
	    return this.belongsTo('User')
	}
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




