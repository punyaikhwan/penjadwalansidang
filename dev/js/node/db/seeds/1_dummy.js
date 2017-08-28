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
    return Math.floor(Math.random() * (high+1 - low) + low);
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

    let nameList = [
        'dosen1',
        'dosen2',
        'dosen3',
        'dosen4',
        'dosen5',
        'dosen6',
        'dosen7',
        'mahasiswa1',
        'mahasiswa2',
        'mahasiswa3',
    ]

    let emailList = [
        'monstergelo@gmail.com',
        'hasnurk@gmail.com',
        '13514106@std.stei.itb.ac.id',
        '13514066@std.stei.itb.ac.id',
        '13514010@std.stei.itb.ac.id',
        'heinrichcxxxv@gmail.com',
        'bimawansatrianto@gmail.com',
        '',
        '',
        '',
    ]

    let peranList = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
    ]
    for (var i_4 = 1; i_4 < 11; i_4++) {
        tasks.push(
            knex('user').insert({
                id: i_4,
                nama: nameList[i_4-1],
                email: emailList[i_4-1],
                peran: peranList[i_4-1],
                NIM: faker.phone.phoneNumberFormat(),
            }).then(function(){console.log('populate user')})
        );
    };

    ///pasangan_kp
    for (var i_4 = 1; i_4 < 4; i_4++) {
        tasks.push(
            knex('pasangan_kp').insert({
                id: i_4,
                topik: faker.hacker.phrase(),
            }).then(function(){console.log('pasangan_kp')})
        );
    };

    ///pasangan_ta
    for (var i_4 = 1; i_4 < 4; i_4++) {
        tasks.push(
            knex('pasangan_ta').insert({
                id: i_4,
                topik: faker.hacker.phrase(),
                mahasiswa_id: i_4+6,
            }).then(function(){console.log('pasangan_ta')})
        );
    };

    let KP_userID = [
        1,
        2,
        3,
        7,
        8,
        9
    ]

    let KP_peran = [
        1,
        1,
        1,
        0,
        0,
        0
    ]

    let KP_pasangan = [
        1,
        2,
        3,
        1,
        2,
        3
    ]
    ///anggota_pasangan_kp
    for (var i_4 = 1; i_4 < 7; i_4++) {
        tasks.push(
            knex('anggota_pasangan_kp').insert({
                id: i_4,
                user_id: KP_userID[i_4-1],
                peran_pasangan: KP_peran[i_4-1],
                pasangan_id: KP_pasangan[i_4-1],
            }).then(function(){console.log('populate anggota_pasangan_kp')})
        );
    };

    ///anggota_pasangan_ta
    for (var i_4 = 1; i_4 < 7; i_4++) {
        tasks.push(
            knex('anggota_pasangan_ta').insert({
                id: i_4,
                user_id: i_4,
                peran_pasangan: random(1,3),
                pasangan_id: random(1,3),
            }).then(function(){console.log('populate anggota_pasangan_ta')})
        );
    };

    //ruangan
    for (var i_4 = 1; i_4 < 3; i_4++) {
        tasks.push(
            knex('ruangan').insert({
                id: i_4,
                nama: "ruangan "+i_4
            }).then(function(){console.log('populate anggota_pasangan_ta')})
        );
    };

    //event ruangan
    let room_list = [
        1,
        1,
        2,
        2
    ]
    for (var i_4 = 1; i_4 < 5; i_4++) {
        tasks.push(
            knex('event_ruangan').insert({
                id: i_4,
                room_id: room_list[i_4-1],
                title: "event "+i_4,
                start: faker.date.past(),
                end: faker.date.recent(),
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