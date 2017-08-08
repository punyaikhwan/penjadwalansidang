let helper = require('./db.js');
require('./anggota_pasangan_kp.js')
require('./user.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'pasangan_kp',
    hasTimestamps: true,
    dosen: function() {
	    return this.hasMany('AnggotaPasanganKP', 'pasangan_id').query({where: {peran_pasangan: '1'}});
	},
	anggota: function() {
	    return this.hasMany('AnggotaPasanganKP', 'pasangan_id').query({where: {peran_pasangan: '0'}});
	}
});	
model = helper.bookshelf.model('PasanganKP', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated:['dosen', 'anggota']}).then(function(data){
// 	console.log("==kp=================")
// 	console.log(JSON.stringify(data))
// })




