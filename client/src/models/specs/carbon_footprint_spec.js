const assert = require('assert');
const CarbonFootprints = require('../carbon_footprint_data.js');

describe('CarbonFootprints', function(){
  let carbonFootprints1;

  beforeEach(function(){
    carbonFootprints1 = new CarbonFootprints();
  })

  it('should point to CO2 API', function(){
    actual = carbonFootprints1.url;
    assert.strictEqual(actual, 'http://localhost:3000/api/carbonFootprints');
  });

})
