const CarbonFootprints = require('./models/carbon_footprint_data.js');
const FormWrapperView = require('./views/form_wrapper.js')
const Questions = require('./models/questions.js')
const ResultView = require('./views/result_view')
const DisplayResultsChart = require('./views/display_results_chart.js');

document.addEventListener('DOMContentLoaded', () => {

  // console.log("working");

  const resultsChartContainer = document.querySelector('#resultsChart');
  const displayResultsChart = new DisplayResultsChart(resultsChartContainer);
  displayResultsChart.bindEvents();

  const resultContainer = document.querySelector('#footprint-result');
  const resultDisplay = new ResultView(resultContainer);
  resultDisplay.bindEvents();

  const formWrapper = document.querySelector('#wrapper');
  const formWrapperView = new FormWrapperView(formWrapper);
  formWrapperView.bindEvents();

  const carbonFootprints = new CarbonFootprints();
  carbonFootprints.getData();
  carbonFootprints.bindEvents();


  const questions = new Questions();
  questions.getData();
  // questions.bindEvents();

})
