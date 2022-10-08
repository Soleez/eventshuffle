import express from 'express';
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


module.exports = app
