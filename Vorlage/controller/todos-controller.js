import { todoStore } from '../services/todo-store.js';

export class TodoController {
    
    createTodo = async (req, res) => {
      await todoStore.add(req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
      res.redirect("/");
    };

    showTodo = async (req, res) => {
        let todo = await todoStore.get(req.params.id);
        res.render("showTodo", { todo });
    };

    updateTodo = async (req, res) => {
        let updatedTodo = await todoStore.update(req.params.id, req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
        res.render("showTodo", { todo: updatedTodo });
    };

    deleteTodo = async (req, res) => {
        let deletedTodo = await todoStore.delete(req.params.id);
        res.render("showTodo", { todo: deletedTodo });
    };
}

export const todoController = new TodoController();
