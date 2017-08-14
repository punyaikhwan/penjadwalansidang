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
    
    var tasks = [];

    //Inserts seed entries for each table
    //user
    for (var i_4 = 1; i_4 < 31; i_4++) {
        tasks.push(
            knex('user').insert({
                id: i_4,
                nama: faker.name.firstName(),
                email: faker.internet.email(),
                peran: random(1,3),
                NIM: faker.phone.phoneNumberFormat(),
            }).then(function(){console.log('populate user')})
        );
    };

    ///pasangan_kp
    for (var i_4 = 1; i_4 < 31; i_4++) {
        tasks.push(
            knex('pasangan_kp').insert({
                id: i_4,
                topik: faker.hacker.phrase(),
            }).then(function(){console.log('pasangan_kp')})
        );
    };

    ///pasangan_ta
    for (var i_4 = 1; i_4 < 31; i_4++) {
        tasks.push(
            knex('pasangan_ta').insert({
                id: i_4,
                topik: faker.hacker.phrase(),
                mahasiswa_id: i_4,
            }).then(function(){console.log('pasangan_ta')})
        );
    };

    ///anggota_pasangan_kp
    for (var i_4 = 1; i_4 < 31; i_4++) {
        tasks.push(
            knex('anggota_pasangan_kp').insert({
                id: i_4,
                user_id: i_4,
                peran_pasangan: random(1,3),
                pasangan_id: i_4,
            }).then(function(){console.log('populate anggota_pasangan_kp')})
        );
    };

    ///anggota_pasangan_ta
    for (var i_4 = 1; i_4 < 31; i_4++) {
        tasks.push(
            knex('anggota_pasangan_ta').insert({
                id: i_4,
                user_id: i_4,
                peran_pasangan: random(1,3),
                pasangan_id: i_4,
            }).then(function(){console.log('populate anggota_pasangan_ta')})
        );
    };

    

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