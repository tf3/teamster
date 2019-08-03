const express = require('express');
const path = require('path');
const port = process.env.PORT || 2000;
const app = express();

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});