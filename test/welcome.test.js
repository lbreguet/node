const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index');

describe('Welcome page', () => {
  it('should return Hello when asked for message 1', async() => {
    const res = await request(app) .get('/welcome/1');
    expect(res.statusCode).equals(200);
    expect(res.body).to.have.property('message', 'Hello');
  });
  it('should return Bye when asked for message 2', async() => {
    const res = await request(app) .get('/welcome/2');
    expect(res.statusCode).equals(200);
    expect(res.body).to.have.property('message', 'Bye');
  });
  it('should return Unknown when asked for unknown message id', async() => {
    const res = await request(app) .get('/welcome/-1');
    expect(res.statusCode).equals(200);
    expect(res.body).to.have.property('message', 'Unknown');
  });

  it('should return a newly created welcome message', async () => {
    const res = await request(app) 
        .post('/welcome') 
        .send({message: "Sky"})
    expect(res.statusCode).equals(200) 
    expect(res.body).to.have.property('message', 'Sky was successfully added') 
    expect(res.body).to.have.property('id', 3) 
    const res2 = await request(app)
        .get('/welcome/3') 
    expect(res2.statusCode).equals(200) 
    expect(res2.body).to.have.property('message', 'Sky')
    })
});

