'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const JWT_PASSWORD = `notellin'`;

let app = express();
let users = { doug: 'douglas01' };

app.post('/login', bodyParser.json(), (req, res) => {
  if (
    !users[req.body.username] ||
    users[req.body.username] !== req.body.password
  ) {
    return res.status(401).json({ error: 'Usuário e/ou senha inválidos' });
  } else {
    return res.json({
      token: jwt.sign(
        {
          username: req.body.username
        },
        JWT_PASSWORD,
        {
          expiresIn: '1h'
        }
      )
    });
  }
});

app.get('/session', (req, res) => {
  let auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer')) {
    res.status(401).json({ error: 'Sessão Inválida' });
  }

  auth = auth.split('Bearer').pop().trim();

  jwt.verify(auth, JWT_PASSWORD, (err, data) => {
    if (err)
      return res.status(401).json({ error: ' Session Impossible to decode' });

    return res.json({ token : data });
  });

});

app.listen(3000);
