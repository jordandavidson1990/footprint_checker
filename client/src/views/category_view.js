const PubSub = require('../helpers/pub_sub.js')
const QuestionView = require('./question_view.js')

const CategoryView = function (container) {
  this.container = container;
};

CategoryView.prototype.render = function (category, categoryIndex, categoryTopic) {
  const questionView = new QuestionView(this.container);
  // debugger
  category.forEach((question) => questionView.render(question, categoryIndex, categoryTopic, category.findIndex(q => q.statement === question.statement)+1))
};

module.exports = CategoryView;
