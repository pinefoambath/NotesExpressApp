import { todoStore } from '../services/todo-store.js';

export class TodoController {
    
    async index(req, res) {
        const todos = req.query.sort === 'title'
          ? await todoStore.allSortedByTitle(req.query.asc === 'true') 
          : await todoStore.all();
        res.render("index", { todos });
    };


    add = (req, res) => {
        const todo = { 
            title: "", 
            importance: "", 
            dueDate: "", 
            description: "", 
            completed: false 
        };
        res.render("addOrEdit", { todo });
    };

showTodo = async (req, res) => {
    let todo = await todoStore.get(req.params.id);
    if (!todo) {
      res.status(404).send('Todo not found 😜');
    } else {
        res.render("addOrEdit", { todo });
    }
  };

createOrUpdateTodo = async (req, res) => {
    if (req.body.id) {
        await todoStore.update(req.body.id, req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
    } else {
        await todoStore.add(req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
    }
    res.redirect("/");
};

}

export const todoController = new TodoController();
