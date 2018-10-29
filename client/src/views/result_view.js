const PubSub = require('../helpers/pub_sub.js');

const ResultView = function(container){
  this.container = container;
};

ResultView.prototype.bindEvents = function () {

  const totalDiv = document.createElement('div')

  PubSub.subscribe('CarbonFootprints:results-ready', (totalCarbonFootPrints) => {
    // debugger
    const total = document.createElement('p');
    total.textContent = `Result: ${totalCarbonFootPrints.detail}`
    totalDiv.appendChild(total)
  });

  this.container.appendChild(totalDiv)
}

// ResultView.prototype.render = function(result){
//   const resultContainer = document.createElement('div');
//   resultContainer.id = 'result';
// debugger;
//   const checkerResult = document.createElement('p');
//   checkerResult.textContent = result;
//   // return checkerResult
// };

module.exports = ResultView;
