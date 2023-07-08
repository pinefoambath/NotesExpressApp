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

  async allSortedByTitle(asc = true) {
    let result = this.db
      .find({})
      .sort({ title: asc ? 1 : -1 })
      .exec();
    return result;
  }

  async allSortedByDueDate(asc = true) {
    let result = this.db
      .find({})
      .sort({ dueDate: asc ? 1 : -1 })
      .exec();

    return result;
  }
}

export const todoStore = new TodoStore();
