import { todoStore } from '../services/todo-store.js';

export class TodoController {
    
  add = (req, res) => {
    res.render("addOrEdit");
};

showTodo = async (req, res) => {
    let todo = await todoStore.get(req.params.id);
    res.render("addOrEdit", { todo });
};

createOrUpdateTodo = async (req, res) => {
    if (req.body.id) {
        await todoStore.update(req.body.id, req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
    } else {
        await todoStore.add(req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
    }
    res.redirect("/");
};

    deleteTodo = async (req, res) => {
      await todoStore.delete(req.params.id);
      res.redirect("/");
    };
}

export const todoController = new TodoController();
