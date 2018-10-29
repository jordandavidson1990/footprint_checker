const PubSub = require('../helpers/pub_sub.js')
const QuestionView = require('./question_view.js')

const CategoryView = function (container) {
  this.container = container;
};

CategoryView.prototype.render = function (category, categoryIndex, categoryTopic, numberOfQuestions) {

  const categoryDiv = document.createElement('div')
  const title = document.createElement('h2');
  // title.type = 'text';
  title.textContent = categoryTopic;

  categoryDiv.appendChild(title);
  const questionView = new QuestionView(this.container);
  // debugger
  category.forEach((question) => {
    let questionContainer = questionView.render(question, categoryIndex, categoryTopic, category.findIndex(q => q.statement === question.statement)+1, numberOfQuestions)

    categoryDiv.appendChild(questionContainer)
  })
  const nextcategoryButton = document.createElement('button');
  categoryDiv.appendChild(nextcategoryButton)
  nextcategoryButton.textContent = "Next"
  nextcategoryButton.addEventListener('click', () => {
    debugger;
    PubSub.publish('CategoryView:submit-next-category', categoryDiv)

  })
  // debugger
  return categoryDiv;
  // this.container.appendChild(categoryDiv);
};

module.exports = CategoryView;
