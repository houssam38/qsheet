'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var answerSheetCtrlStub = {
  index: 'answerSheetCtrl.index',
  show: 'answerSheetCtrl.show',
  create: 'answerSheetCtrl.create',
  upsert: 'answerSheetCtrl.upsert',
  patch: 'answerSheetCtrl.patch',
  destroy: 'answerSheetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var answerSheetIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './answerSheet.controller': answerSheetCtrlStub
});

describe('AnswerSheet API Router:', function() {
  it('should return an express router instance', function() {
    answerSheetIndex.should.equal(routerStub);
  });

  describe('GET /api/answerSheets', function() {
    it('should route to answerSheet.controller.index', function() {
      routerStub.get
        .withArgs('/', 'answerSheetCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/answerSheets/:id', function() {
    it('should route to answerSheet.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'answerSheetCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/answerSheets', function() {
    it('should route to answerSheet.controller.create', function() {
      routerStub.post
        .withArgs('/', 'answerSheetCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/answerSheets/:id', function() {
    it('should route to answerSheet.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'answerSheetCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/answerSheets/:id', function() {
    it('should route to answerSheet.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'answerSheetCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/answerSheets/:id', function() {
    it('should route to answerSheet.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'answerSheetCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
