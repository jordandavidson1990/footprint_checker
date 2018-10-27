const PubSub = require('../helpers/pub_sub.js')
const CategoryView = require('./category_view.js')

const FormWrapperView = function(container){
  this.container = container;
};

FormWrapperView.prototype.bindEvents = function(){
  // debugger;
  PubSub.subscribe('Questions:data-loaded', (evt) => {
    // debugger;
    this.render(evt.detail)
  });
};

FormWrapperView.prototype.render = function(questionsCollection){
  debugger;
    const categoryView = new CategoryView(this.container);
    questionsCollection.forEach((topic) => categoryView.render(topic.questions, questionsCollection.findIndex(c => c.category === topic.category)+1))
    debugger
};

module.exports = FormWrapperView;
