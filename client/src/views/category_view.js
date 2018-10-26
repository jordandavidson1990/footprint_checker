const PubSub = require('../helpers/pub_sub.js')
const QuestionView = require('./question_view.js')

const CategoryView = function (container) {
  this.container = container;
};

CategoryView.prototype.render = function (category) {
  const questionView = new QuestionView(this.container);
  category.forEach((question) => questionView.render(question))
};

module.exports = CategoryView;
