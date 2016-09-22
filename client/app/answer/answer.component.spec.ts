'use strict';

describe('Component: AnswerComponent', function() {
  // load the controller's module
  beforeEach(module('qsheetApp.answer'));

  var AnswerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AnswerComponent = $componentController('answer', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
