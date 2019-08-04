const express = require('express');
const path = require('path');
const groups = require('./model.js');
const port = process.env.PORT || 2000;
const app = express();

app.use(express.static('dist'));

app.get('/groups/:id?', (req, res) => {
  const { id } = req.params;
  groups.find(id)
    .then(group => res.json(group))
    .catch(err => res.json(err));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
