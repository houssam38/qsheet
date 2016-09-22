'use strict';

describe('Service: answer', function() {
  // load the service's module
  beforeEach(module('qsheetApp.answer'));

  // instantiate service
  var answer;
  beforeEach(inject(function(_answer_) {
    answer = _answer_;
  }));

  it('should do something', function() {
    expect(!!answer).toBe(true);
  });
});
