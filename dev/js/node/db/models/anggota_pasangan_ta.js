let helper = require('./db.js');
require('./pasangan_ta.js')
require('./user.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'anggota_pasangan_ta',
    hasTimestamps: true,
    kelompok: function() {
	    return this.belongsTo('PasanganTA')
	},
	user: function() {
	    return this.belongsTo('User')
	}
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




