'use strict'

const express = require('express')
let bodyParser = require('body-parser')
let app = express()

let users = { doug : 'douglas01' }

app.post('/login', bodyParser.json(), (req, res) =>{
  return console.log( req.body )
})

app.listen(3000)