'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sheetCtrlStub = {
  index: 'sheetCtrl.index',
  show: 'sheetCtrl.show',
  create: 'sheetCtrl.create',
  upsert: 'sheetCtrl.upsert',
  patch: 'sheetCtrl.patch',
  destroy: 'sheetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sheetIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sheet.controller': sheetCtrlStub
});

describe('Sheet API Router:', function() {
  it('should return an express router instance', function() {
    sheetIndex.should.equal(routerStub);
  });

  describe('GET /api/sheets', function() {
    it('should route to sheet.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sheetCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/sheets/:id', function() {
    it('should route to sheet.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sheetCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/sheets', function() {
    it('should route to sheet.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sheetCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/sheets/:id', function() {
    it('should route to sheet.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'sheetCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sheets/:id', function() {
    it('should route to sheet.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'sheetCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sheets/:id', function() {
    it('should route to sheet.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sheetCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
