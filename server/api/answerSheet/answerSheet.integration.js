'use strict';

var app = require('../..');
import request from 'supertest';

var newAnswerSheet;

describe('AnswerSheet API:', function() {
  describe('GET /api/answerSheets', function() {
    var answerSheets;

    beforeEach(function(done) {
      request(app)
        .get('/api/answerSheets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          answerSheets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      answerSheets.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/answerSheets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/answerSheets')
        .send({
          name: 'New AnswerSheet',
          info: 'This is the brand new answerSheet!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAnswerSheet = res.body;
          done();
        });
    });

    it('should respond with the newly created answerSheet', function() {
      newAnswerSheet.name.should.equal('New AnswerSheet');
      newAnswerSheet.info.should.equal('This is the brand new answerSheet!!!');
    });
  });

  describe('GET /api/answerSheets/:id', function() {
    var answerSheet;

    beforeEach(function(done) {
      request(app)
        .get(`/api/answerSheets/${newAnswerSheet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          answerSheet = res.body;
          done();
        });
    });

    afterEach(function() {
      answerSheet = {};
    });

    it('should respond with the requested answerSheet', function() {
      answerSheet.name.should.equal('New AnswerSheet');
      answerSheet.info.should.equal('This is the brand new answerSheet!!!');
    });
  });

  describe('PUT /api/answerSheets/:id', function() {
    var updatedAnswerSheet;

    beforeEach(function(done) {
      request(app)
        .put(`/api/answerSheets/${newAnswerSheet._id}`)
        .send({
          name: 'Updated AnswerSheet',
          info: 'This is the updated answerSheet!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAnswerSheet = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAnswerSheet = {};
    });

    it('should respond with the original answerSheet', function() {
      updatedAnswerSheet.name.should.equal('New AnswerSheet');
      updatedAnswerSheet.info.should.equal('This is the brand new answerSheet!!!');
    });

    it('should respond with the updated answerSheet on a subsequent GET', function(done) {
      request(app)
        .get(`/api/answerSheets/${newAnswerSheet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let answerSheet = res.body;

          answerSheet.name.should.equal('Updated AnswerSheet');
          answerSheet.info.should.equal('This is the updated answerSheet!!!');

          done();
        });
    });
  });

  describe('PATCH /api/answerSheets/:id', function() {
    var patchedAnswerSheet;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/answerSheets/${newAnswerSheet._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched AnswerSheet' },
          { op: 'replace', path: '/info', value: 'This is the patched answerSheet!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAnswerSheet = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAnswerSheet = {};
    });

    it('should respond with the patched answerSheet', function() {
      patchedAnswerSheet.name.should.equal('Patched AnswerSheet');
      patchedAnswerSheet.info.should.equal('This is the patched answerSheet!!!');
    });
  });

  describe('DELETE /api/answerSheets/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/answerSheets/${newAnswerSheet._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when answerSheet does not exist', function(done) {
      request(app)
        .delete(`/api/answerSheets/${newAnswerSheet._id}`)
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
