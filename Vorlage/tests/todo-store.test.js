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
        description: "Description 2",
        completed: "",
        _id: "Abc123",
      },
      {
        title: "Todo 3",
        importance: 5,
        dueDate: "2023-07-08",
        creationDate: "2023-06-08",
        description: "Description 3",
        completed: "",
        _id: "Xyz456",
      },
      {
        title: "Todo 4",
        importance: 1,
        dueDate: "2023-07-07",
        creationDate: "2023-06-07",
        description: "Description 4",
        completed: "",
        _id: "Def789",
      },
      {
        title: "Todo 5",
        importance: 1,
        dueDate: "",
        creationDate: "2023-07-07",
        description: "Description 5",
        completed: "",
        _id: "AgP709",
      },
      {
        title: "Todo 6",
        importance: 1,
        dueDate: "",
        creationDate: "2023-06-08",
        description: "Description 6",
        completed: "",
        _id: "bDe231",
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
        "desc",
        false,
      );
      expect(sortedTodos[0].title).to.equal("Todo 1");
      expect(sortedTodos[1].title).to.equal("Todo 2");
      expect(sortedTodos[2].title).to.equal("Todo 3");
      expect(sortedTodos[3].title).to.equal("Todo 4");
      expect(sortedTodos[4].title).to.equal("Todo 5");
      expect(sortedTodos[5].title).to.equal("Todo 6");
    });

    it("should sort todos by importance in descending order", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "importance",
        "asc",
        false,
      );
      expect(sortedTodos[0].importance).to.equal(5);
      expect(sortedTodos[1].importance).to.equal(3);
      expect(sortedTodos[2].importance).to.equal(2);
      expect(sortedTodos[3].importance).to.equal(1);
      expect(sortedTodos[4].importance).to.equal(1);
      expect(sortedTodos[5].importance).to.equal(1);
    });

    it("should filter out completed todos", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "title",
        "desc",
        true,
      );
      expect(sortedTodos).to.have.lengthOf(5);
      expect(sortedTodos[0].completed).to.not.equal("on");
    });

    it("should sort todos by DueDate in ascending order with empty value data at the end", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "dueDate",
        "desc",
        false,
      );
      expect(sortedTodos[0].dueDate).to.equal("2023-07-05");
      expect(sortedTodos[1].dueDate).to.equal("2023-07-06");
      expect(sortedTodos[2].dueDate).to.equal("2023-07-07");
      expect(sortedTodos[3].dueDate).to.equal("2023-07-08");
      expect(sortedTodos[4].dueDate).to.equal("");
      expect(sortedTodos[5].dueDate).to.equal("");
    });

    it("should sort todos by DueDate in descending order with empty value data at the end", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "dueDate",
        "asc",
        false,
      );
      expect(sortedTodos[0].dueDate).to.equal("2023-07-08");
      expect(sortedTodos[1].dueDate).to.equal("2023-07-07");
      expect(sortedTodos[2].dueDate).to.equal("2023-07-06");
      expect(sortedTodos[3].dueDate).to.equal("2023-07-05");
      expect(sortedTodos[4].dueDate).to.equal("");
      expect(sortedTodos[5].dueDate).to.equal("");
    });

    it("should sort todos by CreationDate in descending order", async () => {
      const sortedTodos = await todoStore.getSortedFilteredTodos(
        "creationDate",
        "asc",
        false,
      );
      expect(sortedTodos[0].creationDate).to.equal("2023-07-07");
      expect(sortedTodos[1].creationDate).to.equal("2023-06-08");
      expect(sortedTodos[2].creationDate).to.equal("2023-06-08");
      expect(sortedTodos[3].creationDate).to.equal("2023-06-07");
      expect(sortedTodos[4].creationDate).to.equal("2023-06-06");
      expect(sortedTodos[5].creationDate).to.equal("2023-06-05");
    });
  });
});
