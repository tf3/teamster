const express = require('express');
const groups = require('./model.js');
const port = process.env.PORT || 2000;
const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.get('/groups/:id?', (req, res) => {
  const { id } = req.params;
  groups.find(id)
    .then(group => res.json(group))
    .catch(err => res.json(err));
});

app.post('/groups', (req, res) => {
  const group  = req.body;
  groups.add(group)
    .then(() => res.json(group))
    .catch(err => res.json(err));
});

app.delete('/groups/:id', (req, res) => {
  const { id } = req.params;
  groups.delete(id)
    .then(deletedGroup => res.json(deletedGroup))
    .catch(err => res.json(err));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
