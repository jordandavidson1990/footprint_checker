const assert = require('assert');
const Users = require('../users.js');

describe('Users', function(){
  let user1;

  beforeEach(function(){
    user1 = new Users();
  })

  it('should point to Users API', function(){
    actual = user1.url;
    assert.strictEqual(actual, 'http://localhost:3000/api/users');
  });

})
