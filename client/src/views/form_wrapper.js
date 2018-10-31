const PubSub = require('../helpers/pub_sub.js')
const CategoryView = require('./category_view.js')

const FormWrapperView = function(container){
  this.container = container;
  this.currentCategory = 0;
  this.totalCarbonFootPrints = 0;
};

FormWrapperView.prototype.bindEvents = function(){
  PubSub.subscribe('Questions:data-loaded', (evt) => {
    this.render(evt.detail)
  });
};

FormWrapperView.prototype.render = function(questionsCollection){

  const calculateButton = document.createElement('button');
  calculateButton.textContent = "Calculate";

  PubSub.subscribe('QuestionView:option-selected', (evt) => {
    calculateButton.addEventListener('click', () => {

      PubSub.publish('QuestionView:final-selected', evt.detail)
    })
  })
  const categoryView = new CategoryView(this.container);

  this.container.innerHTML = "";

  const topic = questionsCollection[this.currentCategory];

  const categoryDiv = categoryView.render(topic.questions, questionsCollection.findIndex(c => c.category === topic.category)+1, topic.category, topic.questions.length, questionsCollection.length,
   topic.fact, topic.image, topic.source)
   // debugger

  this.container.appendChild(categoryDiv);

  // Increment current category
  this.currentCategory += 1;

  try{throw this.currentCategory}
  catch(temporaryCurrentCategory){
  // temporaryCurrentCategory = this.currentCategory

  PubSub.subscribe('CategoryView:submit-next-category', (event) => {
    // debugger
    // make sure currentCategory is not > length of categories
    if(temporaryCurrentCategory < questionsCollection.length){
      // debugger;
    // this.render(questionsCollection);
    ///////////
    const calculateButton = document.createElement('button');
    calculateButton.textContent = "Calculate";

    PubSub.subscribe('QuestionView:option-selected', (evt) => {
      calculateButton.addEventListener('click', () => {

        PubSub.publish('QuestionView:final-selected', evt.detail)
      })
    })
      const categoryView = new CategoryView(this.container);

      this.container.innerHTML = "";

      const topic = questionsCollection[temporaryCurrentCategory];
      const categoryDiv = categoryView.render(topic.questions, questionsCollection.findIndex(c => c.category === topic.category)+1, topic.category, topic.questions.length, questionsCollection.length, topic.fact, topic.image, topic.source)

      this.container.appendChild(categoryDiv);
      temporaryCurrentCategory += 1;
      if(temporaryCurrentCategory === questionsCollection.length){
        this.container.appendChild(calculateButton)
      // debugger
      // event.detail.removeChild(event.detail.querySelector('button'))
    }
  }
  })
  }
}


module.exports = FormWrapperView;
