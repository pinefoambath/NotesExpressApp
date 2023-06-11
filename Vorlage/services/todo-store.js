import Datastore from 'nedb-promises';

export class Todo {
  constructor(title, importance, dueDate, description, completed) {
    this.title = title;
    this.importance = importance;
    this.dueDate = dueDate;
    this.description = description;
    this.completed = completed;
  }
}

export class TodoStore {
  constructor(db) {
    this.db = db || new Datastore({ filename: './data/todos.db', autoload: true });
  }

  async add(title, importance, dueDate, description, completed) {
    let todo = new Todo(title, importance, dueDate, description, completed);
    return this.db.insert(todo);
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async all() {
    return this.db.find({});
  }

  async update(id, title, importance, dueDate, description, completed) {
    let todo = new Todo(title, importance, dueDate, description, completed);
    await this.db.update({ _id: id }, { $set: todo }, {});
    return this.get(id);
  }
}

export const todoStore = new TodoStore();
