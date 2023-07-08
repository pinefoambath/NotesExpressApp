import { todoStore } from '../services/todo-store.js';

export class IndexController {
  index = async (req, res) => {
    const sort = req.query.sort; 
    let todos;
    switch(sort){
      case 'title':
        todos = await todoStore.allSortedByTitle();
        break;
      // andere sort Funktionen hier beifügen
      default:
        todos = await todoStore.all();
    }
    res.render("index", { todos, dark: true });
  };
}

export const indexController = new IndexController();

