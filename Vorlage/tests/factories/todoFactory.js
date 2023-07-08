import { TodoStore, Todo } from '../../services/todo-store.js';

export function makeTodo(data) {
  const defaultData = {
    title: 'Default Title',
    importance: 1,
    dueDate: new Date(),
    description: 'Default description',
    completed: false,
  };
  return new Todo({...defaultData, ...data});
}

export async function createTodo(data) {
  const todoStore = new TodoStore();
  const todo = makeTodo(data);
  return todoStore.add(todo.title, todo.importance, todo.dueDate, todo.description, todo.completed);
}
