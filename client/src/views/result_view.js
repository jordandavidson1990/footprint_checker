const PubSub = require('../helpers/pub_sub.js');
const CategoryView = require('./category_view.js');

const ResultView = function(container){
  this.container = container;
};

const category = document.querySelector("#categoryDiv")

ResultView.prototype.bindEvents = function () {



  let totalDiv =
  document.createElement('div');
  // debugger;

  // this.container.innerHTML = '';
  totalDiv.id = "totalDiv";

  PubSub.subscribe('CarbonFootprints:results-ready', (totalCarbonFootPrints) => {

    if(event.target.body.querySelector('#totalDiv')){
      const previoustotalDiv = document.querySelector('#totalDiv')
      previoustotalDiv.parentNode.removeChild(previoustotalDiv);

      newTotalDiv = document.createElement('div');
      newTotalDiv.id = "totalDiv";

      const total = document.createElement('h4');
      total.textContent = `Total Carbon Dioxide Produced: ${totalCarbonFootPrints.detail}KGs`
      // newTotalDiv.appendChild(total);
      this.container.appendChild(newTotalDiv)
      this.container.appendChild(total)
      debugger

      if(totalCarbonFootPrints.detail > 10000){
      const aboveAverage = document.createElement('h5');
      aboveAverage.textContent = `${totalCarbonFootPrints.detail} is pretty high. Perhaps you could try reducing your carbon footprint by reducing your meat consumption, taking public transport more often and buying local produce.`
      newTotalDiv.appendChild(aboveAverage)
      this.container.appendChild(newTotalDiv)
    }

    if(8000 > totalCarbonFootPrints.detal && totalCarbonFootPrints<= 10000){
      const average = document.createElement('h5');
      average.textContent = `Although ${totalCarbonFootPrints.detail} isn't that high you could still stand to cut down on your CO2 emmisions. Perhaps take up cycling and turn off lights when not using them. Keep up the good work!`
      newTotalDiv.appendChild(average)
      this.container.appendChild(newTotalDiv)
    }

    if(totalCarbonFootPrints < 8000){
      const low = document.createElement('h5');
      low.textContent = `Well done!! ${totalCarbonFootPrints} is below average. Keep up the good work!`
      newTotalDiv.appendChild(low)
      this.container.appendChild(newTotalDiv)
    }
    }
  });
  this.container.appendChild(totalDiv);
}

module.exports = ResultView;
