const PubSub = require('../helpers/pub_sub.js');

const ResultView = function(container){
  this.container = container;
};

// debugger
ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('Results:data-loaded', (evt) => {
    debugger
    this.render(evt.detail);
  });
}

ResultView.prototype.render = function(result){
  const resultContainer = document.createElement('div');
  resultContainer.id = 'result';
debugger;
  const checkerResult = document.createElement('p');
  checkerResult.textContent = result;
  return checkerResult
};

module.exports = ResultView;
