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
        debugger;
        // const combinedDataArray = this.getCombinedGraphData(evt.detail);
        let combinedDataArray = new google.visualization.DataTable();
        combinedDataArray.addColumn('string', evt.detail[0][0]);
        combinedDataArray.addColumn('number', evt.detail[0][1]);
        combinedDataArray.addColumn('number', evt.detail[0][2]);
        combinedDataArray.addRows(evt.detail.length - 1);

        for (let i = 1; i < evt.detail.length ; i++){
          for (let j = 0; j < evt.detail[0].length; j++ ){
            combinedDataArray.setCell(i - 1, j, evt.detail[i][j]);
          }
        }
        debugger;

        let formatter = new google.visualization.NumberFormat({suffix: 'kg'});
        formatter.format(combinedDataArray, 1);
        formatter.format(combinedDataArray, 2);

        let view = new google.visualization.DataView(combinedDataArray);
        view.setColumns([0, 1, 2]);

        let table = new google.visualization.Table(document.querySelector('#resultsChart'));
        table.draw(view, {width: '50%', height: '100%'});

        let chart = new google.visualization.BarChart(document.querySelector('#resultsTable'));
        chart.draw(view);

        google.visualization.events.addListener(table, 'sort',
          function(event) {
            combinedDataArray.sort([{column: event.column, desc: !event.ascending}]);
            chart.draw(view);
          });

        // const data = GoogleChartsModule.GoogleCharts.api.visualization.arrayToDataTable(evt.detail);
        //   // [['Category', 'Your CO2 Footprints', 'UK Average Person Footprints'],
        //   // ['Air Travel', 100, 70],
        //   // ['Diet', 200, 300],
        //   // ['Transport', 500, 200],
        //   // ['Home', 300, 300]]
        // // );
        //
        // var options = {
        //   title: 'CO2 Footprint Results',
        //   // legend: { position: 'top', maxLines: 2 },
        //   colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
        //   interpolateNulls: false,
        // };
        //
        // const resultChart = new GoogleChartsModule.GoogleCharts.api.visualization.ColumnChart(document.querySelector('#resultsChart'));
        // // areaChart.draw(data);
        // resultChart.draw(data, options);
  });
  })



}

DisplayResultsChart.prototype.getCombinedGraphData = function (inputArray) {

};

module.exports = DisplayResultsChart;
