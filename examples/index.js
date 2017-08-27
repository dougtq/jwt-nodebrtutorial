'use strict';

let jwt = require('jsonwebtoken')

let token = jwt.sign({
  user_id : 10
}, 'ultra_mega_secret', {
  expiresIn : '1h'
})

let decoded = jwt.verify(token, 'ultra_mega_secret')

console.log(decoded)