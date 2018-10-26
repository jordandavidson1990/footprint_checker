const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Questions = function(url){
  this.url = 'http://localhost:3000/api/questions';
  this.request = new Request(this.url);
};

Questions.prototype.getData = function(){
  // debugger;
  this.request.get()
  .then((questionsCollection) => {
    // debugger;
    PubSub.publish('Questions:data-loaded', questionsCollection);
    // debugger;
  })
  .catch(console.err);
};

module.exports = Questions;
