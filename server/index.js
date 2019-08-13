const express = require('express');
const path = require('path');
const compression = require('compression');
const Group = require('./controllers/group.js');

const port = process.env.PORT || 2000;
const app = express();

app.use(compression());
app.use(express.static('dist'));
app.use(express.json());

// API routes
app.get('/groups/:id?', (req, res) => {
  const { id } = req.params;

  Group.find(id)
    .then(group => res.json(group))
    .catch(err => res.json(err));
});

app.post('/groups', (req, res) => {
  const group = req.body;

  Group.add(group)
    .then(() => res.json(group))
    .catch(err => res.json(err));
});

app.put('/groups/:id', (req, res) => {
  const { id } = req.params;
  const group = req.body;

  Group.update(id, group)
    .then(updatedGroup => res.json(updatedGroup))
    .catch(err => res.json(err));
});

app.delete('/groups/:id', (req, res) => {
  const { id } = req.params;

  Group.delete(id)
    .then(deletedGroup => res.json(deletedGroup))
    .catch(err => res.json(err));
});

// Other routes
app.get('/new', (req, res) => {
  Group.add({ teams: [], unassigned: [] })
    .then(({ _id }) => res.redirect(`/${_id}`))
    .catch(err => res.json(err));
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  Group.find(id)
    .then(() => res.sendFile(path.resolve('dist/app.html')))
    .catch(() => res.status(404)
      .sendFile(path.resolve('dist/404.html')));
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
