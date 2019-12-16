const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const Movie = require('../models/movie')
const User = require('../models/user')

let user = {
  _id: '3ddcfa78e38c7107015f35b6',
  name: 'User',
  password: 'pass',
  email: 'a@b.c'
}
let movie1 = {
  _id: '5ddcfa78e38c7107015f35b6',
  title: "Printer",
  year: "2019",
  genre: "Action, Adventure",
  user: user
}
let movie2 = {
  _id: '4ddcfa78e38c7107015f35b6',
    title: "Screen",
    year: "2019",
    genre: "Action, Adventure",
  user: user
}

describe('Movies', () => {
  beforeEach(async function() {
    let u = new User(user)
    await u.save()
  });
  afterEach(async function() {
    await User.deleteOne({_id: user._id})
	});

  describe('Getting movies', () => {
      beforeEach(async function () {
          let m1 = new Movie(movie1)
          let m2 = new Movie(movie2)
      await m1.save()
      await m2.save()
    });
      afterEach(async function () {
          await Movie.deleteOne({ _id: movie1._id })
          await Movie.deleteOne({ _id: movie2._id })
    });

    it('should return all movies', async () => {
        const res = await request(app)
            .get(`/api/${user._id}/movies`)
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].title', 'Printer')
        expect(res.body).to.have.nested.property('data[1].title', 'Screen')
    })
  })

  describe('Creating movies', () => {
      afterEach(async function () {
          await Product.deleteOne({ _id: movie1._id })
    });

      it('should create correctly and return id and message', async () => {
          var res = await request(app)
            .post(`/api/${user._id}/movies`)
            .send(movie1)
          expect(res.statusCode).equals(201)
          expect(res.body).to.have.property('data').to.have.property('message','Created ok')
          expect(res.body).to.have.property('data').to.have.property('id')
          const id = res.body.data.id
          res = await request(app)
            .get(`/api/${user._id}/movies/${id}`)
          console.log(JSON.stringify(res.body))
          expect(res.statusCode).equals(200)
          expect(res.body).to.have.nested.property('data.title', 'Printer')
      })
  })
})
