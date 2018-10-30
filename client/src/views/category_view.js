const PubSub = require('../helpers/pub_sub.js')
const QuestionView = require('./question_view.js')

const CategoryView = function (container) {
  this.container = container;
};

// debugger
CategoryView.prototype.render = function (category, categoryIndex, categoryTopic, numberOfQuestions, totalNumberOfCategories, fact, img) {

  const categoryDiv = document.createElement('div')
  categoryDiv.id = "categoryDiv"
  // debugger
// debugger
  const topicImg = document.createElement("img");
  topicImg.src = img;
  topicImg.alt = `image of ${categoryTopic}`
  topicImg.id = 'topicImg';
  categoryDiv.appendChild(topicImg)

  const categoryFact = document.createElement('p')
  categoryFact.textContent = fact
  // debugger
  categoryDiv.appendChild(categoryFact)
  const title = document.createElement('h2');
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
  return categoryDiv;
};

module.exports = CategoryView;
