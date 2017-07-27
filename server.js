const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require ('path')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.resolve(__dirname, 'build')));

app.locals.title = 'AmazonBay';

app.get('*', (request, response) =>{
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
