require('dotenv').config({ path: process.env.ENV_FILE })
const express = require('express')
const initApp = require('./src/app')
const port = 4000


let customChannel= null;
initApp().then(({app, channel}) => {
  customChannel=channel;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})


// setTimeout(function() {
//     console.log('test object ::::', module.exports===customChannel);
//     console.log('module.exports  :::::', module.exports);
// }, 5000);

module.exports = customChannel;