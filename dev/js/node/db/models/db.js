'use strict'

require('knex')
var knex = connectDb();
var bookshelf = require('bookshelf')(knex);
var promise = require('bluebird');
bookshelf.plugin('registry');


//======================================================================================
function connectDb() {
  let knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'ppldev'
    }
  });
  console.log("----- DB Ready -----");
  return knex;
}
//======================================================================================
var emptyTable = function(tableName){
  return knex(tableName).del().then(function(c){console.log('delete '+ tableName)})
}

module.exports = {
  bookshelf,
  promise,
  emptyTable
}
