require('../models')

const request = require("supertest")
const app = require("../app")

const URL_BASE = '/api/v1/artists'

const artist = {
  name: "Seba yatra",
  country: "Colombia",
  formationYear: 2010,
  image: "ramdontext"

}

let artistId

test("POST -> URL_BASE, should return statusCode 201, and res.body.name === artist.name", async () => {

  const res = await request(app)
    .post(URL_BASE)
    .send(artist)

  artistId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)

})

test("GET -> URL_BASE, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})