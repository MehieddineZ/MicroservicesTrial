const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const companies = {};

app.get('/companies', (req, res) => {
  res.send(companies);
});

app.post('/companies', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  companies[id] = {
    id,
    title
  };

  await axios.post('http://localhost:4005/events', {
    type: 'ComapanyCreated',
    data: {
      id,
      title
    }
  });

  res.status(201).send(companies[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
