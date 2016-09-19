'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var qsheetCtrlStub = {
  index: 'qsheetCtrl.index',
  show: 'qsheetCtrl.show',
  create: 'qsheetCtrl.create',
  upsert: 'qsheetCtrl.upsert',
  patch: 'qsheetCtrl.patch',
  destroy: 'qsheetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var qsheetIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './qsheet.controller': qsheetCtrlStub
});

describe('Qsheet API Router:', function() {
  it('should return an express router instance', function() {
    qsheetIndex.should.equal(routerStub);
  });

  describe('GET /api/qsheets', function() {
    it('should route to qsheet.controller.index', function() {
      routerStub.get
        .withArgs('/', 'qsheetCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/qsheets/:id', function() {
    it('should route to qsheet.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'qsheetCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/qsheets', function() {
    it('should route to qsheet.controller.create', function() {
      routerStub.post
        .withArgs('/', 'qsheetCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/qsheets/:id', function() {
    it('should route to qsheet.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'qsheetCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/qsheets/:id', function() {
    it('should route to qsheet.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'qsheetCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/qsheets/:id', function() {
    it('should route to qsheet.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'qsheetCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
