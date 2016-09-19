'use strict';

var app = require('../..');
import request from 'supertest';

var newSheet;

describe('Sheet API:', function() {
  describe('GET /api/sheets', function() {
    var sheets;

    beforeEach(function(done) {
      request(app)
        .get('/api/sheets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sheets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sheets.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/sheets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sheets')
        .send({
          name: 'New Sheet',
          info: 'This is the brand new sheet!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSheet = res.body;
          done();
        });
    });

    it('should respond with the newly created sheet', function() {
      newSheet.name.should.equal('New Sheet');
      newSheet.info.should.equal('This is the brand new sheet!!!');
    });
  });

  describe('GET /api/sheets/:id', function() {
    var sheet;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sheets/${newSheet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sheet = res.body;
          done();
        });
    });

    afterEach(function() {
      sheet = {};
    });

    it('should respond with the requested sheet', function() {
      sheet.name.should.equal('New Sheet');
      sheet.info.should.equal('This is the brand new sheet!!!');
    });
  });

  describe('PUT /api/sheets/:id', function() {
    var updatedSheet;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sheets/${newSheet._id}`)
        .send({
          name: 'Updated Sheet',
          info: 'This is the updated sheet!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSheet = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSheet = {};
    });

    it('should respond with the original sheet', function() {
      updatedSheet.name.should.equal('New Sheet');
      updatedSheet.info.should.equal('This is the brand new sheet!!!');
    });

    it('should respond with the updated sheet on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sheets/${newSheet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let sheet = res.body;

          sheet.name.should.equal('Updated Sheet');
          sheet.info.should.equal('This is the updated sheet!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sheets/:id', function() {
    var patchedSheet;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sheets/${newSheet._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sheet' },
          { op: 'replace', path: '/info', value: 'This is the patched sheet!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSheet = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSheet = {};
    });

    it('should respond with the patched sheet', function() {
      patchedSheet.name.should.equal('Patched Sheet');
      patchedSheet.info.should.equal('This is the patched sheet!!!');
    });
  });

  describe('DELETE /api/sheets/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sheets/${newSheet._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sheet does not exist', function(done) {
      request(app)
        .delete(`/api/sheets/${newSheet._id}`)
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
