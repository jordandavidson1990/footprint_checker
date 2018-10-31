const assert = require('assert');
const Questions = require('../questions.js');

describe('Questions', function(){
  let questionsCollection1;

  beforeEach(function(){
    questionsCollection1 = new Questions();
  })

  it('should point to Questions API', function(){
    actual = questionsCollection1.url;
    assert.strictEqual(actual, 'http://localhost:3000/api/questions');
  });

})
