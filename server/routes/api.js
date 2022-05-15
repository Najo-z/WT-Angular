const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null,
};

app.put('/signup');
app.put('/create_note');
app.put('/:noteId/add_participant');

// Get users
router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
app.get('/tasks');
app.get('/notes');
app.get('/:noteId');
app.get('/:noteId/participants');
app.get('/:participantId');

app.post('/signup', (req, res) => {
  connection((db) => {
    db.collection('users').insert({ name: 'user' });
  });
});
app.post('/logout');

app.delete('/:noteId');

module.exports = router;
