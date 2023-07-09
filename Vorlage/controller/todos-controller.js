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
 
    createOrUpdateTodo = async (req) => {
        let todo;
        let redirectPath;
        if (req.body.id) {
          todo = await todoStore.update(req.body.id, req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
          redirectPath = req.body['submit-type'] === 'Update' ? `/todos/${req.body.id}` : '/';
        } else {
          todo = await todoStore.add(req.body.title, req.body.importance, req.body.dueDate, req.body.description, req.body.completed);
          redirectPath = req.body['submit-type'] === 'Create' ? `/todos/${todo._id}` : '/';
        }
        return { id: todo._id, redirect: redirectPath };
    };
}

export const todoController = new TodoController();
