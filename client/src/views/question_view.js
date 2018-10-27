const PubSub = require('../helpers/pub_sub.js');

const QuestionView = function(container){
  this.container = container;
};
let userInput = {};
QuestionView.prototype.render = function (question, categoryIndex, categoryTopic, questionIndex, numberOfQuestions){
  // debugger
  const questionContainer = document.createElement('div');

  const questionStatement = document.createElement('p');
  questionStatement.textContent = question.statement;

  questionContainer.appendChild(questionStatement);

  question.options.forEach((option) => {
    // debugger

    const questionOptions = document.createElement('input');
    questionOptions.type = 'radio';
    questionOptions.name = `C${categoryIndex}Q${questionIndex}options`;
    questionOptions.value = option.value || option;
    questionOptions.id = option.value || option;

    questionOptions.addEventListener('change', (evt) => {
      userInput[`C${categoryIndex}`] = categoryTopic;
      userInput[`C${categoryIndex}Q${questionIndex}`] = evt.target.value;
      console.log(numberOfQuestions);
      if (questionIndex === numberOfQuestions){
        PubSub.publish('QuestionView:option-selected', userInput)
      }
      // debugger;
    });

    // debugger
    const optionLabel = document.createElement('label');
    optionLabel.textContent = option.text || option;
    optionLabel.for = option.value || option;
    // debugger
    questionContainer.appendChild(optionLabel);
    questionContainer.appendChild(questionOptions);
  })
  this.container.appendChild(questionContainer);
};
module.exports = QuestionView;
