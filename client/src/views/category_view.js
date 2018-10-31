const PubSub = require('../helpers/pub_sub.js')
const QuestionView = require('./question_view.js')

const CategoryView = function (container) {
  this.container = container;
};

CategoryView.prototype.render = function (category, categoryIndex, categoryTopic, numberOfQuestions, totalNumberOfCategories, fact, img, source) {
// debugger
  const categoryDiv = document.createElement('div')
  categoryDiv.id = "categoryDiv"

  const title = document.createElement('h2');
  title.textContent = categoryTopic;

  categoryDiv.appendChild(title);

  const topicImg = document.createElement("img");
  topicImg.src = img;
  topicImg.alt = `image of ${categoryTopic}`
  topicImg.id = 'topicImg';
  categoryDiv.appendChild(topicImg)

  const questionView = new QuestionView(this.container);
  category.forEach((question) => {
    let questionContainer =

    questionView.render(question, categoryIndex, categoryTopic, category.findIndex(q => q.statement === question.statement)+1, numberOfQuestions)

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

  const didYouKnowDiv = document.createElement('div')
  didYouKnowDiv.id = 'didYouKnowDiv'

  const doYouKnow = document.createElement('img');
  doYouKnow.src = "http://www.sodgod.com/wp-content/featured-content/lawn-insect/images/do-you.png"
  doYouKnow.alt = 'Did You Know??';
  doYouKnow.id = 'doYouKnowImg'
  didYouKnowDiv.appendChild(doYouKnow)

  const categoryFact = document.createElement('a')
  categoryFact.textContent = fact
  categoryFact.id = 'fact'
  categoryFact.href = source
  didYouKnowDiv.appendChild(categoryFact)
// debugger
  const factSource = document.createElement('link')
  factSource.textContent = fact
  factSource.src = source
  didYouKnowDiv.appendChild(factSource)

// this.container.appendChild(didYouKnowDiv)
  categoryDiv.appendChild(didYouKnowDiv)
  return categoryDiv;

};

module.exports = CategoryView;
