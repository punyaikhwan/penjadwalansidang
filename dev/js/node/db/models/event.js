let helper = require('./db.js');
require('./pasangan_ta.js')
require('./pasangan_kp.js')
require('./anggota_pasangan_event.js')
require('./ruangan.js')


Model = helper.bookshelf.Model.extend({
    tableName: 'event',
    hasTimestamps: true,
    kelompok_KP: function(){
    	return this.belongsTo('PasanganKP', 'pasangan_id')
    },
    kelompok_TA: function(){
    	return this.belongsTo('PasanganTA', 'pasangan_id')
    },
    mahasiswa: function(){
    	return this.hasMany('AnggotaEvent', 'pasangan_id').query({where: {peran_pasangan: 0}});
    },
    dosen: function(){
    	return this.hasMany('AnggotaEvent', 'pasangan_id').where(filters).where('peran_pasangan', 1).orWhere('peran_pasangan', 2).orWhere('peran_pasangan',3);
    },
    ruangan: function(){
        return this.belongsTo('Ruangan', 'room_id');
    }

});	
model = helper.bookshelf.model('Event', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated: 'kelompok_KP.anggota.user'}).then(function(data){
// 	console.log(JSON.stringify(data))
// })
