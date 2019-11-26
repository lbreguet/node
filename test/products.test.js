const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const Product = require('../models/product')

describe('Getting products', () => {
    it('should return all products', async () => {
        const res = await request(app)
            .get('/api/products')
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].name', 'Laptop')
        expect(res.body).to.have.nested.property('data[1].name', 'Screen')
}) })

describe('Creating products', () => {
    let newProduct = {
        _id: '5ddcfa78e38c7107015f35b6',
        name: "Printer"
    }
    afterEach(async function() {
		await Product.deleteOne({_id: newProduct._id})
	});


    it('should create correctly and return id and message', async () => {
        var res = await request(app)
            .post('/api/products')
            .send(newProduct)
        expect(res.statusCode).equals(201)
        expect(res.body).to.have.property('data').to.have.property('message','Created ok')
        expect(res.body).to.have.property('data').to.have.property('id')
        const id = res.body.data.id
        res = await request(app)
            .get(`/api/products/${id}`)    
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data.name', 'Printer')
    }) 
})