const request = require("supertest")
const app = require("../app")

const URL_BASE = '/api/v1/genres'
const genre = { name: "rock" }

let genreId


test("Post -> URL_BASE, should return status code 201, res.body.name ==== genre.name", async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(genre)

  genreId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test("Get -> URL_BASE, should return statuscode 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_BASE)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> URL_BASE/:id, should return statusCode 200, and res.body.name === genre.name", async () => {

  const res = await request(app)
    .get(`${URL_BASE}/${genreId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test("Put -> URL_BASE/genreId, should return statusCode 200, res.body.name === bodyUpdate.name", async () => {

  const bodyUpdate = {
    name: "pop"
  }

  const res = await request(app)
    .put(`${URL_BASE}/${genreId}`)
    .send(bodyUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(bodyUpdate.name)
})

test("Delete URL_BASE/genreId, should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${genreId}`)

  expect(res.status).toBe(204)
})