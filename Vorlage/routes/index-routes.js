import express from 'express';
import { indexController } from '../controller/index-controller.js';
import { todoController } from '../controller/todos-controller.js';

const router = express.Router();

router.get("/", indexController.index.bind(indexController));
router.get("/todos/create", todoController.add.bind(todoController)); 
router.get("/todos", indexController.index.bind(indexController)); 
router.get("/todos/:id", todoController.showTodo.bind(todoController));
router.post("/todos", async (req, res) => {
  try {
    const { redirect } = await todoController.createOrUpdateTodo(req);
    res.redirect(redirect);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ups! Ein Fehler ist in der Post Route im index-routes.js aufgetreten');
  }
});

export const indexRoutes = router;