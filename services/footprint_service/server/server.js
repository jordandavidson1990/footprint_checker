const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors')

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));
app.use(cors());
app.use(parser.json());

MongoClient.connect('mongodb://mongoservice:27017')
.then((client) => {
  const db = client.db('carbonFootprintTracker');

  const carbonFootprintsCollection = db.collection('carbonFootprints');
  const carbonFootprintsRouter = createRouter(carbonFootprintsCollection);
  app.use('/api/carbonFootprints', carbonFootprintsRouter);

  const usersCollection = db.collection('users');
  const usersRouter = createRouter(usersCollection);
  app.use('/api/users', usersRouter);

  const questionsCollection = db.collection('questions');
  const questionsRouter = createRouter(questionsCollection);
  app.use('/api/questions', questionsRouter);
})
.catch((err) => {
  console.error('Failed to connect to DB');
  console.error(err);
  process.exit(66); //will trigger restart
})

app.listen(3000, function(){
  console.log(`Listening on port ${ this.address().port }`);
});
