import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../app.js";
import { createTodo } from "./factories/todoFactory.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("TodoController", () => {
  it("should create a todo item", async () => {
    const todoData = createTodo();

    const response = await chai.request(app).post("/todos").send(todoData);

    expect(response.status).to.equal(200);
    expect(response.body.title).to.equal(todoData.title);
    expect(response.body.importance).to.equal(todoData.importance);
    expect(response.body.dueDate).to.equal(todoData.dueDate);
    expect(response.body.creationDate).to.equal(todoData.creationDate);
    expect(response.body.description).to.equal(todoData.description);
    expect(response.body.completed).to.equal(todoData.completed);
  });
  it("should return 404 when a non-existent todo is requested", async () => {
    const nonExistentTodoId = "non-existent-id";
    const response = await chai.request(app).get(`/todos/${nonExistentTodoId}`);

    expect(response.status).to.equal(404);
  });
});
