import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../app.js'

chai.use(chaiHttp)
const expect = chai.expect

describe('TodoController', () => {
  it('should return 404 when a non-existent todo is requested', async () => {
    const nonExistentTodoId = 'non-existent-id'
    const response = await chai.request(app).get(`/todos/${nonExistentTodoId}`)

    expect(response.status).to.equal(404)
  })
})
