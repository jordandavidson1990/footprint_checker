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


module.exports = Users;
