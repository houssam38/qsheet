'use strict';

var app = require('../..');
import request from 'supertest';

var newQsheet;

describe('Qsheet API:', function() {
  describe('GET /api/qsheets', function() {
    var qsheets;

    beforeEach(function(done) {
      request(app)
        .get('/api/qsheets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          qsheets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      qsheets.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/qsheets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/qsheets')
        .send({
          name: 'New Qsheet',
          info: 'This is the brand new qsheet!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQsheet = res.body;
          done();
        });
    });

    it('should respond with the newly created qsheet', function() {
      newQsheet.name.should.equal('New Qsheet');
      newQsheet.info.should.equal('This is the brand new qsheet!!!');
    });
  });

  describe('GET /api/qsheets/:id', function() {
    var qsheet;

    beforeEach(function(done) {
      request(app)
        .get(`/api/qsheets/${newQsheet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          qsheet = res.body;
          done();
        });
    });

    afterEach(function() {
      qsheet = {};
    });

    it('should respond with the requested qsheet', function() {
      qsheet.name.should.equal('New Qsheet');
      qsheet.info.should.equal('This is the brand new qsheet!!!');
    });
  });

  describe('PUT /api/qsheets/:id', function() {
    var updatedQsheet;

    beforeEach(function(done) {
      request(app)
        .put(`/api/qsheets/${newQsheet._id}`)
        .send({
          name: 'Updated Qsheet',
          info: 'This is the updated qsheet!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQsheet = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQsheet = {};
    });

    it('should respond with the original qsheet', function() {
      updatedQsheet.name.should.equal('New Qsheet');
      updatedQsheet.info.should.equal('This is the brand new qsheet!!!');
    });

    it('should respond with the updated qsheet on a subsequent GET', function(done) {
      request(app)
        .get(`/api/qsheets/${newQsheet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let qsheet = res.body;

          qsheet.name.should.equal('Updated Qsheet');
          qsheet.info.should.equal('This is the updated qsheet!!!');

          done();
        });
    });
  });

  describe('PATCH /api/qsheets/:id', function() {
    var patchedQsheet;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/qsheets/${newQsheet._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Qsheet' },
          { op: 'replace', path: '/info', value: 'This is the patched qsheet!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQsheet = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQsheet = {};
    });

    it('should respond with the patched qsheet', function() {
      patchedQsheet.name.should.equal('Patched Qsheet');
      patchedQsheet.info.should.equal('This is the patched qsheet!!!');
    });
  });

  describe('DELETE /api/qsheets/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/qsheets/${newQsheet._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when qsheet does not exist', function(done) {
      request(app)
        .delete(`/api/qsheets/${newQsheet._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
