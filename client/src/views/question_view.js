const PubSub = require('../helpers/pub_sub.js');

const QuestionView = function(container){
  this.container = container;
};
let userInput = {};
QuestionView.prototype.render = function (question, categoryIndex, categoryTopic, questionIndex, numberOfQuestions){

  const questionContainer = document.createElement('div');
  const questionStatement = document.createElement('p');
  questionStatement.textContent = question.statement;

  questionContainer.appendChild(questionStatement);

  question.options.forEach((option) => {

    const optionDiv = document.createElement('div');

    const questionOptions = document.createElement('input');
    questionOptions.type = 'radio';
    questionOptions.name = `C${categoryIndex}Q${questionIndex}options`;
    questionOptions.value = option.value || option;
    questionOptions.id = option.value || option;


    userInput[categoryTopic] = {};

    questionOptions.addEventListener('change', (evt) => {
      userInput[categoryTopic][`Q${questionIndex}`] = evt.target.value;
      // console.log(numberOfQuestions);
      // console.log(evt.target.value);
      if (questionIndex === numberOfQuestions){
        // const userInputWithCategory = {}
        PubSub.publish('QuestionView:option-selected', userInput)
      }

    });

    const optionLabel = document.createElement('label');
    optionLabel.textContent = option.text || option;
    optionLabel.htmlFor = option.value || option;

    optionDiv.appendChild(questionOptions);
    optionDiv.appendChild(optionLabel);
    questionContainer.appendChild(optionDiv);
  })
  // debugger;
  return questionContainer
  // this.container.appendChild(questionContainer);
};
module.exports = QuestionView;
