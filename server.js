const express = require('express');
const app = express();

app.use(require('body-parser').json());

const port = process.env.PORT || 3000;

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/simple_react_redux_db');

const User = conn.define('user', {
  name: Sequelize.STRING
});

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.post('/api/users', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.destroy();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

conn.sync({ force: true })
  .then(() => Promise.all([
    User.create({ name: 'batman' }),
    User.create({ name: 'robin' }),
    User.create({ name: 'wonder woman' })
  ]));

app.listen(port, () => console.log(`listening on port ${port}`));
