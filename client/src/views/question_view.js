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

    // this.container.innerHTML = '';

    const optionDiv = document.createElement('div');

    const questionOptions = document.createElement('input');
    questionOptions.type = 'radio';
    questionOptions.name = `C${categoryIndex}Q${questionIndex}options`;
    questionOptions.value = option.value || option;
    questionOptions.id = option.value || option;


    //being tested
    userInput[categoryTopic] = {};

    questionOptions.addEventListener('change', (evt) => {
      userInput[categoryTopic][`Q${questionIndex}`] = evt.target.value;
      // console.log(numberOfQuestions);
      console.log(evt.target.value);
      if (questionIndex === numberOfQuestions){
        // const userInputWithCategory = {}
        PubSub.publish('QuestionView:option-selected', userInput)
        // debugger;
      }

    });

    // debugger
    const optionLabel = document.createElement('label');
    optionLabel.textContent = option.text || option;
    optionLabel.for = option.value || option;
    // debugger
    optionDiv.appendChild(questionOptions);
    optionDiv.appendChild(optionLabel);
    questionContainer.appendChild(optionDiv);
    // questionContainer.appendChild(optionLabel);
    // questionContainer.appendChild(questionOptions);
  })
  // debugger;
  return questionContainer
  // this.container.appendChild(questionContainer);
};
module.exports = QuestionView;
