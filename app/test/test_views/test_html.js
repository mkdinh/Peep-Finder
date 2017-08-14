var express = require('express');
var request = require('supertest');

var app = express();

request(app)
    .get('/api/friends')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
    if (err) throw err;
});