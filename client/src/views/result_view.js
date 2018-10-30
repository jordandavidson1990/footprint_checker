const PubSub = require('../helpers/pub_sub.js');

const ResultView = function(container){
  this.container = container;
};

ResultView.prototype.bindEvents = function () {

  let totalDiv = document.createElement('div');
  totalDiv.id = "totalDiv";

  PubSub.subscribe('CarbonFootprints:results-ready', (totalCarbonFootPrints) => {
    if(event.target.body.querySelector('#totalDiv')){
      debugger;
      const previoustotalDiv = document.querySelector('#totalDiv')
      previoustotalDiv.parentNode.removeChild(previoustotalDiv);

      newTotalDiv = document.createElement('div');
      newTotalDiv.id = "totalDiv";

      const total = document.createElement('p');
      total.textContent = `Result: ${totalCarbonFootPrints.detail}`
      newTotalDiv.appendChild(total);
      this.container.appendChild(newTotalDiv)
    }
    // else{
    //   const total = document.createElement('p');
    //   total.textContent = `Result: ${totalCarbonFootPrints.detail}`
    //   totalDiv.appendChild(total)
    // }
  });
  this.container.appendChild(totalDiv);
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
