'use strict';
//////////////////////////////////////////
//helper
//////////////////////////////////////////
var faker = require('faker');
var crypto = require('crypto');
var moment = require('moment');
faker.seed(90);
var now = moment().format("YYYY-MM-DD HH:mm:ss");
var date_now = moment().format("YYYY-MM-DD");

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function sha256(input, secret){
  const hash = crypto.createHmac('sha256', secret)
                   .update(input)
                   .digest('hex');

  return hash;
}

///////////////////////////////////////////
//create dummy data
///////////////////////////////////////////
exports.seed = function(knex, Promise) {
    
    var tasks = [
        //Deletes ALL existing entries
        knex('anggota_pasangan_kp').del().then(function(c){console.log('delete anggota_pasangan_kp')}),
        knex('anggota_pasangan_ta').del().then(function(c){console.log('delete anggota_pasangan_ta')}),
        knex('pasangan_kp').del().then(function(c){console.log('delete pasangan_kp')}),
        knex('pasangan_ta').del().then(function(c){console.log('delete pasangan_ta')}),
        knex('user').del().then(function(c){console.log('delete user')}),
    ];


    

    //////////////////////////////////////////
    //run task
    //////////////////////////////////////////
    console.log("start running task")
    return Promise.each(tasks, function(t){
        //doing all the task
    }).then(function(r){
        console.log('done');
    }).catch(function(e){
        console.log('eror: '+e);
    });
};