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
  let result = 0.0;
  let airTravelFootprints;
  // debugger;
  // if(userInput["C1"] === "Air Travel"){  //re-check as this condition would always be true
  //   result = this.calculateFootprintForAirTravel(userInput);
  // }

  // if(Object.keys(userInput)[0] === "Air Travel") //re-check as this condition would always be true
  if(Object.keys(userInput["Air Travel"])[0] === "Q1") {
    airTravelFootprints = this.calculateAirTravelFootprint(userInput["Air Travel"]);
    result += airTravelFootprints;
  }

  if(Object.keys(userInput["Diet"])[0] === "Q1") {
    DietFootprints = this.calculateDietFootprint(userInput["Diet"]);
    result += DietFootprints;
  }

  if(Object.keys(userInput["Transport"])[0] === "Q1") {
    TransportFootprints = this.calculateTransportFootprint(userInput["Transport"]);
    result += TransportFootprints;
  }

  if(Object.keys(userInput["Home"])[0] === "Q1") {
    HomeFootprints = this.calculateHomeFootprint(userInput["Home"]);
    result += HomeFootprints;
  }

  return result;
};

CarbonFootprints.prototype.calculateAirTravelFootprint = function (userInputAirTravel) {
  // debugger;
  // const airTravelCollection = this.carbonFootprintsCollection[0];
  // const travelClass = userInput.C1Q2.toLowerCase();
  // const travelDuration = userInput.C1Q3.toLowerCase();
  // const classFactor = airTravelCollection.factors;
  // const travelFactor = classFactor[travelClass];
  // const factor = travelFactor[travelDuration];
  // const result = factor * userInput.C1Q1;

  const factor = this.carbonFootprintsCollection[0].factors[userInputAirTravel.Q2.toLowerCase()][userInputAirTravel.Q3.toLowerCase()];
  const result = factor * userInputAirTravel.Q1;
  return result;
};

CarbonFootprints.prototype.calculateDietFootprint = function (userInputDiet) {
  const dietTypeFactor = this.carbonFootprintsCollection[1].factors.type[userInputDiet.Q1];
  const dietSourceFactor = this.carbonFootprintsCollection[1].factors.source[userInputDiet.Q2];
  const result = dietTypeFactor + dietSourceFactor;
  return result;
};

CarbonFootprints.prototype.calculateTransportFootprint = function (userInputTransport) {
  const transportTypeFactor = this.carbonFootprintsCollection[2].factors[userInputTransport.Q1];
  const result = userInputTransport.Q2 * transportTypeFactor;
  return result;
};

CarbonFootprints.prototype.calculateHomeFootprint = function (userInputHome) {
  return 1;
};

module.exports = CarbonFootprints;
