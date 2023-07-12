import { expect } from "chai";
import { todoStore } from "../services/todo-store.js";

describe("TodoStore", () => {
  describe(".all()", () => {
    it("should return an array of all todos", async () => {
      const todos = await todoStore.all();

      expect(todos).to.be.an("array");
    });
  });

  describe("getSortedFilteredTodos", () => {
    const todos = [
      {
        title: "Todo 1",
        importance: 3,
        dueDate: "2023-07-06",
        creationDate: "2023-06-06",
        description: "Description 1",
        completed: "on",
        _id: "CyHQPWDfcn4P48ww",
      },
      {
        title: "Todo 2",
        importance: 2,
        dueDate: "2023-07-05",
        creationDate: "2023-06-05",
        description: "Description 1",
        completed: "",
        _id: "Abc123",
      },
      {
        title: "Todo 3",
        importance: 5,
        dueDate: "2023-07-08",
        creationDate: "2023-06-08",
        description: "Description 1",
        completed: "",
        _id: "Xyz456",
      },
      {
        title: "Todo 4",
        importance: 1,
        dueDate: "2023-07-07",
        creationDate: "2023-06-07",
        description: "Description 1",
        completed: "",
        _id: "Def789",
      },
    ];

    const dbMock = {
      find: async () => todos,
    };

    beforeEach(() => {
      todoStore.db = dbMock;
    });

    it("should sort todos by title in ascending order", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "title",
        -1,
        false,
      );
      expect(sortedTodos[0].title).to.equal("Todo 1");
      expect(sortedTodos[1].title).to.equal("Todo 2");
      expect(sortedTodos[2].title).to.equal("Todo 3");
      expect(sortedTodos[3].title).to.equal("Todo 4");
    });

    it("should sort todos by importance in descending order", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "importance",
        1,
        false,
      );
      expect(sortedTodos[0].importance).to.equal(5);
      expect(sortedTodos[1].importance).to.equal(3);
      expect(sortedTodos[2].importance).to.equal(2);
      expect(sortedTodos[3].importance).to.equal(1);
    });

    it("should filter out completed todos", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "title",
        -1,
        true,
      );
      expect(sortedTodos).to.have.lengthOf(3);
      expect(sortedTodos[0].completed).to.not.equal("on");
    });

    it("should sort todos by DueDate in ascending order", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "dueDate",
        -1,
        false,
      );
      expect(sortedTodos[0].dueDate).to.equal("2023-07-05");
      expect(sortedTodos[1].dueDate).to.equal("2023-07-06");
      expect(sortedTodos[2].dueDate).to.equal("2023-07-07");
      expect(sortedTodos[3].dueDate).to.equal("2023-07-08");
    });

    it("should sort todos by CreationDate in descending order", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "creationDate",
        1,
        false,
      );
      expect(sortedTodos[0].creationDate).to.equal("2023-06-08");
      expect(sortedTodos[1].creationDate).to.equal("2023-06-07");
      expect(sortedTodos[2].creationDate).to.equal("2023-06-06");
      expect(sortedTodos[3].creationDate).to.equal("2023-06-05");
    });
  });
});
