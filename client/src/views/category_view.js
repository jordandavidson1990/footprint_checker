const PubSub = require('../helpers/pub_sub.js')
const QuestionView = require('./question_view.js')

const CategoryView = function (container) {
  this.container = container;
};

CategoryView.prototype.render = function (category, categoryIndex, categoryTopic, numberOfQuestions, totalNumberOfCategories) {

  const categoryDiv = document.createElement('div')
  const title = document.createElement('h2');
  // title.type = 'text';
  title.textContent = categoryTopic;

  categoryDiv.appendChild(title);
  const questionView = new QuestionView(this.container);
  // debugger
  category.forEach((question) => {
    // debugger
    let questionContainer =

    questionView.render(question, categoryIndex, categoryTopic, category.findIndex(q => q.statement === question.statement)+1, numberOfQuestions)
    // debugger
    categoryDiv.appendChild(questionContainer)
  })
  const nextcategoryButton = document.createElement('button');

  if(categoryIndex < totalNumberOfCategories){
    categoryDiv.appendChild(nextcategoryButton)

    nextcategoryButton.textContent = "Next"
    nextcategoryButton.addEventListener('click', () => {

      PubSub.publish('CategoryView:submit-next-category', categoryDiv)
    })
  }
  const backCategoryButton = document.createElement('button');
  if(categoryIndex > 1){
    categoryDiv.appendChild(backCategoryButton)

    backCategoryButton.textContent = "Back"
    backCategoryButton.id = "back"
    backCategoryButton.addEventListener('click', () => {

      PubSub.publish('CategoryView:submit-back-category', categoryDiv)
    })
  }
  return categoryDiv;
};

module.exports = CategoryView;
