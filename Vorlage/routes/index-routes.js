import express from 'express';
import { indexController } from '../controller/index-controller.js';
import { todoController } from '../controller/todos-controller.js';

const router = express.Router();

router.get("/", indexController.index.bind(indexController));
router.get('/todos/create', todoController.add.bind(todoController)); 
router.get("/todos/:id", todoController.showTodo.bind(todoController));
router.post("/todos", todoController.createOrUpdateTodo.bind(todoController));

export const indexRoutes = router;