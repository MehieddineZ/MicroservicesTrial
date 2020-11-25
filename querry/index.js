const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const companies = {};

app.get('/companies', (req, res) => {
  res.send(companies);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'CompanyCreated') {
    const { id, title } = data;

    companies[id] = { id, title, customers : [] };
  }

  if (type === 'CustomerCreated') {
    const { id, content, companytId } = data;

    const company = companies[companytId];
    company.customers.push({ id, content });
  }

  console.log(companies);

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
