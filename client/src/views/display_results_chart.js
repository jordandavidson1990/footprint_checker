const PubSub = require('../helpers/pub_sub.js');
const GoogleChartsModule = require('google-charts');

const DisplayResultsChart = function(container){
  this.container = container;
};

DisplayResultsChart.prototype.bindEvents = function () {
  const paragraph = document.createElement('p');
  paragraph.textContent = "Test Graph Area";
  this.container.appendChild(paragraph);

  PubSub.subscribe("CarbonFootprints:chart-data-ready", (evt) => {
    GoogleChartsModule.GoogleCharts.load(() => {
        const data = GoogleChartsModule.GoogleCharts.api.visualization.arrayToDataTable(evt.detail);
          // [['Category', 'Your CO2 Footprints', 'UK Average Person Footprints'],
          // ['Air Travel', 100, 70],
          // ['Diet', 200, 300],
          // ['Transport', 500, 200],
          // ['Home', 300, 300]]
        // );

        var options = {
          title: 'CO2 Footprint Results',
          // legend: { position: 'top', maxLines: 2 },
          colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
          interpolateNulls: false,
        };

        const resultChart = new GoogleChartsModule.GoogleCharts.api.visualization.ColumnChart(document.querySelector('#resultsChart'));
        // areaChart.draw(data);
        resultChart.draw(data, options);
  });
  })



}

module.exports = DisplayResultsChart;
