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

  // it('should calculate Air Travel Footprints', function(){
  //   const userInputAirTravel = {
  //                               "Q1": "1000",
  //                               "Q2": "Business",
  //                               "Q3": "short_haul"
  //                               }
  //   carbonFootprints1.getData();
  //   actual = carbonFootprints1.calculateAirTravelFootprint(userInputAirTravel);
  //   assert.strictEqual(actual, 126);
  // });

})
