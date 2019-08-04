const express = require('express');
const path = require('path');
const groups = require('./model.js');

const port = process.env.PORT || 2000;
const app = express();

app.use(express.static('dist'));
app.use(express.json());

// API routes
app.get('/groups/:id?', (req, res) => {
  const { id } = req.params;

  groups.find(id)
    .then(group => res.json(group))
    .catch(err => res.json(err));
});

app.post('/groups', (req, res) => {
  const group = req.body;

  groups.add(group)
    .then(() => res.json(group))
    .catch(err => res.json(err));
});

app.put('/groups/:id', (req, res) => {
  const { id } = req.params;
  const group = req.body;

  groups.update(id, group)
    .then(updatedGroup => res.json(updatedGroup))
    .catch(err => res.json(err));
});

app.delete('/groups/:id', (req, res) => {
  const { id } = req.params;

  groups.delete(id)
    .then(deletedGroup => res.json(deletedGroup))
    .catch(err => res.json(err));
});

// Other routes
app.get('/new', (req, res) => {
  groups.add({})
    .then(({ _id }) => res.redirect(`/${_id}`))
    .catch(err => res.json(err));
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  groups.find(id)
    .then(() => res.sendFile(path.resolve('dist/app.html')))
    .catch(() => res.status(404)
      .sendFile(path.resolve('dist/404.html')));
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
