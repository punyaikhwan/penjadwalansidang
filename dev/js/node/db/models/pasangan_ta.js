let helper = require('./db.js');
require('./anggota_pasangan_ta.js')
require('./user.js')

Model = helper.bookshelf.Model.extend({
    tableName: 'pasangan_ta',
    hasTimestamps: true,
    mahasiswa: function() {
	    return this.belongsTo('User', 'mahasiswa_id')
	},
    pembimbing: function() {
	    return this.hasMany('AnggotaPasanganTA', 'pasangan_id').query({where: {peran_pasangan: '1'}});
	},
	penguji: function() {
	    return this.hasMany('AnggotaPasanganTA', 'pasangan_id').query({where: {peran_pasangan: '2'}});
	},
	akhir: function() {
	    return this.hasMany('AnggotaPasanganTA', 'pasangan_id').query({where: {peran_pasangan: '3'}});
	},
	anggota: function() {
		 return this.hasMany('AnggotaPasanganTA', 'pasangan_id')
	}


});	
model = helper.bookshelf.model('PasanganTA', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated: 'pembimbing.user'}).then(function(data){
// 	console.log(JSON.stringify(data))
// })




