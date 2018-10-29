const PubSub = require('../helpers/pub_sub.js')
const CategoryView = require('./category_view.js')

const FormWrapperView = function(container){
  this.container = container;
  this.currentCategory = 0;
  this.totalCarbonFootPrints = 0;
};

FormWrapperView.prototype.bindEvents = function(){
  // debugger;
  PubSub.subscribe('Questions:data-loaded', (evt) => {
    // debugger;
    this.render(evt.detail)
  });
};

FormWrapperView.prototype.render = function(questionsCollection){
  // debugger;

  const calculateButton = document.createElement('button');
  calculateButton.textContent = "Calculate";

  PubSub.subscribe('QuestionView:option-selected', (evt) => {
    calculateButton.addEventListener('click', () => {
      // debugger;

      PubSub.publish('QuestionView:final-selected', evt.detail)
    })
  })
  const categoryView = new CategoryView(this.container);

  this.container.innerHTML = "";
  // debugger;

  const topic = questionsCollection[this.currentCategory];

  const categoryDiv = categoryView.render(topic.questions, questionsCollection.findIndex(c => c.category === topic.category)+1, topic.category, topic.questions.length)

  this.container.appendChild(categoryDiv);

  // Increment current category
  this.currentCategory += 1;

  PubSub.subscribe('CategoryView:submit-next-category', (event) => {
    // make sure currentCategory is not > length of categories
    if(this.currentCategory < questionsCollection.length)
    // { debugger;
    // Somehow call this thing again
    this.render(questionsCollection);
    // debugger;

    if(this.currentCategory === questionsCollection.length){
      // debugger

      this.container.appendChild(calculateButton)
    }
  })
}

module.exports = FormWrapperView;
