'use strict';

describe('Controller: SheetCtrl', function() {
  // load the controller's module
  beforeEach(module('qsheetApp.sheet'));

  var SheetCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    SheetCtrl = $controller('SheetCtrl', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
