import { todoStore } from '../services/todo-store.js';

export class IndexController {
    index = async (req, res) => {
      const todos = await todoStore.all();
      res.render("index", { todos, dark: true });
    };
}

export const indexController = new IndexController();
