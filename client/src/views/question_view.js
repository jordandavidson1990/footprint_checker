const PubSub = require('../helpers/pub_sub.js');

const QuestionView = function(container){
  this.container = container;
};
let userInput = {};
QuestionView.prototype.render = function (question, categoryIndex, categoryTopic, questionIndex){
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
    questionOptions.value = option;
    questionOptions.id = option;

    questionOptions.addEventListener('change', (evt) => {

      userInput[`C${categoryIndex}`] = categoryTopic;
      // userInput[questionIndex] ={}
      userInput[`C${categoryIndex}Q${questionIndex}`] = evt.target.value;
      console.log(userInput);
      PubSub.publish('QuestionView:option-selected', userInput)
      // debugger;
    });

    // debugger
    const optionLabel = document.createElement('label');
    optionLabel.textContent = option;
    optionLabel.for = option;
    // debugger
    questionContainer.appendChild(optionLabel);
    questionContainer.appendChild(questionOptions);
  })
this.container.appendChild(questionContainer);
};



module.exports = QuestionView;
