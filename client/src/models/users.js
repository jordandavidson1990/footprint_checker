const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Users = function(url){
  this.url = 'http://localhost:3000/api/users';
  this.request = new Request(this.url);
};

Users.prototype.bindEvents = function () {
  PubSub.subscribe('QuestionView:final-selected', (evt) => {
    this.postUserInput(evt.detail);
  })
  // let initalSave = 1;
  // PubSub.subscribe('QuestionView:user-input-ready', (evt) => {
  //   debugger;
  //   if(initalSave === 1){
  //     this.postUserInput(evt.detail);
  //     initalSave += 1;
  //   }
  //   else{
  //     this.updateUserInput(evt.detail);
  //   }
  // })
};

Users.prototype.getData = function(){
  this.request.get()
  .then((usersCollection) => {
    PubSub.publish('Users:data-loaded', usersCollection);
  })
  .catch(console.error);
}

Users.prototype.postUserInput = function (user) {
  const request = new Request(this.url);
  request.post(user).then((users) => {
    PubSub.publish('Users:user-input-saved', users);
  })
  .catch(console.error)
};

Users.prototype.updateUserInput = function (updatedInput) {
  const id = updatedInput._id;
  this.request
    .put(updatedInput, id)
    .then((updatedInputs) => {
      this.userInput = updatedInputs;
      PubSub.publish('Users:user-input-updated', this.userInput);
    })
    .catch((err) => console.error(err));
};


module.exports = Users;
