let helper = require('./db.js');
require('./pasangan_ta.js')
require('./pasangan_kp.js')


Model = helper.bookshelf.Model.extend({
    tableName: 'event',
    hasTimestamps: true,
    kelompok_KP: function(){
    	return this.belongsTo('PasanganKP', 'pasangan_id')
    },
    kelompok_TA: function(){
    	return this.belongsTo('PasanganTA', 'pasangan_id')
    },

});	
model = helper.bookshelf.model('Event', Model);

module.exports = {
	model
}
//testing====================================================
// Model.fetchAll({withRelated: 'kelompok_KP.anggota.user'}).then(function(data){
// 	console.log(JSON.stringify(data))
// })