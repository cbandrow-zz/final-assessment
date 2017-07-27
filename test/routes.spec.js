process.env.NODE_ENV = 'test';

var knex = require('../db/knex')
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);

describe('API GET Routes',() => {
  it('should get all items from api/v1/items', (done) =>{
    chai.request(server)
      .get('/api/v1/items')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('title');
        response.body[0].should.have.property('item_description');
        response.body[0].should.have.property('price');
        done();
      });
  });

  it('should get all orders from api/v1/orders', (done) =>{
    chai.request(server)
      .get('/api/v1/orders')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('total_price');
        response.body[0].should.have.property('date');
        done();
      });
  });

  it('should get a single item from api/v1/items/:id', (done) =>{
    chai.request(server)
      .get('/api/v1/items/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(1);
        response.body[0].title.should.equal('Nintendo Switch');
        response.body[0].item_description.should.equal('The new home video game system from Nintendo. In addition to providing single and multiplayer thrills at home, the Nintendo Switch system can be taken on the go so players can enjoy a full home console experience anytime, anywhere.');
        response.body[0].picture_url.should.equal('http://www.nintendo.com/switch/etRgxnAu0zRX4bmWnt9K628wG7YQUI6t/images/switch/buy-now/bundle_color_console.jpg');
        done();
      });
  });

  it('(sad path) should return 404 if the item is not found ', (done) =>{
    chai.request(server)
      .get('/api/v1/items/85')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        done();
      });
  });

  it('should get a single order from api/v1/orders/:id', (done) =>{
    chai.request(server)
      .get('/api/v1/orders/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(1);
        response.body[0].total_price.should.equal('100.00');
        response.body[0].date.should.equal('February 33rd, 2017');
        done();
      });
  });

  it('(sad path) should return 404 if the order is not found', (done) =>{
    chai.request(server)
      .get('/api/v1/orders/25')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        done();
      });
  });
});

describe('API POST Routes', function() {
  // before((done)=> {
  //   knex.migrate.rollback()
  //   .then(() =>{
  //     knex.migrate.latest()
  //     .then(() => {
  //       return knex.seed.run()
  //       .then(()=> {
  //         done();
  //       });
  //     });
  //   });
  // });
  //
  // beforeEach(done => {
  //   knex.seed.run()
  //   .then(() => done());
  // });
  //
  // it('should post a new order to api/v1/orders', (done) => {
  //   chai.request(server)
  //   .post('/api/v1/orders')
  //   .send({
  //     "price": 850,
  //     "date": "February 10th, 2018"
  //   })
  //   .end((err, response) =>{
  //     console.log(err)
  //     response.should.have.status(201);
  //     done();
  //     chai.request(server)
  //     .get('/api/v1/orders/:2')
  //     .end((err, response) =>{
  //       response.should.have.status(200);
  //       response.should.be.json;
  //       response[0].price.should.equal(850);
  //       response[0].date.should.equal("February 10th, 2018")
  //       done();
  //     })
  //   })
  // })
});
