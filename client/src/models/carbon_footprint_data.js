const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const CarbonFootprints = function(url){
  this.url = 'http://localhost:3000/api/carbonFootprints';
  this.request = new Request(this.url);
  this.carbonFootprintsCollection = {};
  this.userCarbonFootprints = [];
};

CarbonFootprints.prototype.getData = function () {
  this.request.get()
  .then((carbonFootprintsCollection) => {
    this.carbonFootprintsCollection = carbonFootprintsCollection;
  })
  .catch(console.err);
};


CarbonFootprints.prototype.bindEvents = function () {
  PubSub.subscribe('QuestionView:final-selected', (evt) => {
    const totalCarbonFootPrints = this.calculateFootprint(evt.detail);
debugger;
    PubSub.publish('CarbonFootprints:results-ready', totalCarbonFootPrints)
    if(Object.keys(evt.detail).length === this.userCarbonFootprints.length - 1){
      debugger;
      PubSub.publish("CarbonFootprints:chart-data-ready", this.userCarbonFootprints);
    }
  })
};

CarbonFootprints.prototype.calculateFootprint = function (userInput) {
  let result = 0.0;
  let airTravelFootprints;
  this.userCarbonFootprints = [['Category', 'Your CO2 Footprints', 'UK Average Person Footprints']];

  if(Object.keys(userInput["Air Travel"])[0] === "Q1") {
    airTravelFootprints = this.calculateAirTravelFootprint(userInput["Air Travel"]);
    result += airTravelFootprints;
    this.createChartArray("Air Travel", airTravelFootprints);

  }

  if(Object.keys(userInput["Diet"])[0] === "Q1") {
    DietFootprints = this.calculateDietFootprint(userInput["Diet"]);
    result += DietFootprints;
    this.createChartArray("Diet", DietFootprints);
  }

  if(Object.keys(userInput["Transport"])[0] === "Q1") {
    TransportFootprints = this.calculateTransportFootprint(userInput["Transport"]);
    result += TransportFootprints;
    this.createChartArray("Transport", TransportFootprints);
  }

  if(Object.keys(userInput["Home"])[0] === "Q1") {
    HomeFootprints = this.calculateHomeFootprint(userInput["Home"]);
    result += HomeFootprints;
    this.createChartArray("Home", HomeFootprints);
  }

  return result;
  console.log('result', result);
};

CarbonFootprints.prototype.calculateAirTravelFootprint = function (userInputAirTravel) {

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
  let result;
  if(userInputHome.Q2 === "central"){
    result = this.carbonFootprintsCollection[3].factors.heating_type[userInputHome.Q2][userInputHome.Q1];
  }
  else{
    const heatingFactor = this.carbonFootprintsCollection[3].factors.heating_type[userInputHome.Q2];
    result = userInputHome.Q3 * heatingFactor;
  }
  return result;
};


CarbonFootprints.prototype.createChartArray = function (category, footprintsValue) {
  const ukAverage = {"Air Travel": 5000, "Diet": 4000, "Transport": 6000, "Home": 4000};

  this.userCarbonFootprints.push([category, footprintsValue, ukAverage[category]]);
  // debugger;
};

module.exports = CarbonFootprints;
