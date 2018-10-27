const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const CarbonFootprints = function(url){
  this.url = 'http://localhost:3000/api/carbonFootprints';
  this.request = new Request(this.url);
  this.carbonFootprintsCollection = {};
};

CarbonFootprints.prototype.getData = function () {
  this.request.get()
  .then((carbonFootprintsCollection) => {
    this.carbonFootprintsCollection = carbonFootprintsCollection;
    // PubSub.publish('CarbonFootprints:data-loaded', carbonFootprintsCollection);
  })
  .catch(console.err);
};


CarbonFootprints.prototype.bindEvents = function () {
  PubSub.subscribe('QuestionView:option-selected', (evt) => {
    const totalCarbonFootPrints = this.calculateFootprint(evt.detail)
  })
};

CarbonFootprints.prototype.calculateFootprint = function (userInput) {
  // console.log(userInput);
  // debugger;
  // if(userInput.C1 === "Air Travel")
    const result = this.calculateFootprintForAirTravel(userInput);
    return result;
};

CarbonFootprints.prototype.calculateFootprintForAirTravel = function (userInput) {
  debugger;
  const airTravelCollection = this.carbonFootprintsCollection[0];
  const travelClass = userInput.C1Q2.toLowerCase();
  const travelDuration = userInput.C1Q3.toLowerCase();
  const classFactor = airTravelCollection.factors;
  const travelFactor = classFactor[travelClass];
  const factor = travelFactor[travelDuration];
  const result = factor * userInput.C1Q1;
  return result;
};

module.exports = CarbonFootprints;
