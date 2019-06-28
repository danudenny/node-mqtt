// var express = require('express');
// var pg = require("pg");
// var app = express();
// var pool = new pg.Pool();
 
// var connectionString = "postgres://postgres:psctl@192.168.7.94:5433/primasaver";
 
// app.get('/', function (req, res, next) {
//     pool.connect(connectionString,function(err,client,done) {
//        if(err){
//            console.log("not able to get connection "+ err);
//            res.status(400).send(err);
//        } 
//        client.query('SELECT * FROM users where id = $7', [1],function(err,result) {
//            done(); // closing the connection;
//            if(err){
//                console.log(err);
//                res.status(400).send(err);
//            }
//            res.status(200).send(result.rows);
//        });
//     });
// });
 
// app.listen(4000, function () {
//     console.log('Server is running.. on Port 4000');
// });

const pg        = require('pg');
const express   = require('express');
const app       = express();

var connectionString = "postgres://primasaver:primasaver@192.168.7.94:5433/psctl";

const pool = new pg.Pool({
    connectionString: connectionString,
})

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       pool.query('SELECT * FROM users WHERE id = 7', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});