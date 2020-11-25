const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const cusromersByComId = {};

app.get('/companies/:id/customers', (req, res) => {
  res.send(cusromersByComId[req.params.id] || []);
});

app.post('/companies/:id/customers', async (req, res) => {
  const customerId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const customers = cusromersByComId[req.params.id] || [];

  customers.push({ id: customerId, content });

  cusromersByComId[req.params.id] = customers;

  await axios.post('http://localhost:4005/events', {
    type: 'CustomerCreated',
    data: {
      id: CustomerId,
      content,
      companyId: req.params.id
    }
  });

  res.status(201).send(customers);
});

app.post('/events', (req, res) => {
  console.log('Event Received:', req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
