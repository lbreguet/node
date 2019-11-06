const request = require('supertest')
const expect = require('chai').expect
const app = require('../index')

describe('Welcome page', () => {
    it('should return a welcome message', async () => {
        const res = await request(app)
            .get('/welcome')
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.property('message', 'Hello')
}) })