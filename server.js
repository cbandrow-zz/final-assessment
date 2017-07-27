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

app.get('/', (request, response) =>{
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.get('/api/v1/items', (request, response) => {
  database('items').select()
    .then((items) => {
      if(items.length){
        response.status(200).json(items)
      } else {
        response.status(404).json({
          error: ' 404: No Items Found'
        })
      }
    })
    .catch(() => {
      response.status(500).send(
        {
          'Error':'500: Internal error retrieving specific all items.'
        }
      )
    })
})

app.get('/api/v1/orders', (request, response) => {
  database('orders').select()
    .then((orders) => {
      if(orders.length){
        response.status(200).json(orders)
      } else {
        response.status(404).json({
          error: ' 404: No Orders Found'
        })
      }
    })
    .catch(() => {
      response.status(500).send(
        {
          'Error':'500: Internal error retrieving specific all previous orders.'
        }
      )
    })
})

app.post('/api/v1/orders', (request, response) => {
  let data = request.body
  database('orders').select()
  .then((orders) => {
    let match = orders.find((order) =>{
      return order.date === data.date;
    })
    if (!match) {
      database('orders').insert({
        date: data.date,
        total_price: data.price
      }, 'id')
      .then((orderId) => {
          response.status(201).json({orderId})
        })
        .catch((error) => console.log(error))
    } else {
      database('orders').where('date', data.date).select()
      .then((specificOrder) =>{
        let dataPrice = parseInt(data.price, 10)
        database('orders').where('id', specificOrder[0].id).increment('total_price', dataPrice)
        .then((orderUpdate) =>{
          response.status(201).json({orderUpdate})
        })
        .catch((error) => console.log(error))
      })
    }
  })
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
