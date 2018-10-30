const PubSub = require('../helpers/pub_sub.js');
const GoogleChartsModule = require('google-charts');

const DisplayResultsChart = function(container){
  this.container = container;
};

DisplayResultsChart.prototype.bindEvents = function () {
  PubSub.subscribe("CarbonFootprints:chart-data-ready", (evt) => {
    GoogleChartsModule.GoogleCharts.load(() => {

        this.drawTableAndChart(evt.detail);
    });
  })
}

DisplayResultsChart.prototype.drawTableAndChart = function (inputArray) {
  let combinedDataArray = new google.visualization.DataTable();
  combinedDataArray.addColumn('string', inputArray[0][0]);
  combinedDataArray.addColumn('number', inputArray[0][1]);
  combinedDataArray.addColumn('number', inputArray[0][2]);
  combinedDataArray.addRows(inputArray.length - 1);

  for (let i = 1; i < inputArray.length ; i++){
    for (let j = 0; j < inputArray[0].length; j++ ){
      combinedDataArray.setCell(i - 1, j, inputArray[i][j]);
    }
  }
  debugger;

  let formatter = new google.visualization.NumberFormat({suffix: 'kg'});
  formatter.format(combinedDataArray, 1);
  formatter.format(combinedDataArray, 2);

  let view = new google.visualization.DataView(combinedDataArray);
  view.setColumns([0, 1, 2]);


  let table = new google.visualization.Table(document.querySelector('#resultsChart'));
  table.draw(view);

  // {width: '80%', height: '100%'}

  let chartOptions = {
    title: 'CO2 Footprint Results',
    // legend: { position: 'top', maxLines: 2 },
    colors: ['#5C3292', '#1A8763'],
    interpolateNulls: false
  };

  let chart = new google.visualization.BarChart(document.querySelector('#resultsTable'));
  chart.draw(view, chartOptions);

  google.visualization.events.addListener(table, 'sort',
    function(event) {
      combinedDataArray.sort([{column: event.column, desc: !event.ascending}]);
      chart.draw(view, chartOptions);
    });
};

module.exports = DisplayResultsChart;
