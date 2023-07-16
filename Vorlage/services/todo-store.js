import Datastore from 'nedb-promises'

export class Todo {
  constructor (
    title,
    importance,
    dueDate,
    creationDate,
    description,
    completed
  ) {
    this.title = title
    this.importance = importance
    this.dueDate = dueDate
    this.creationDate = creationDate
    this.description = description
    this.completed = completed
  }
}

export class TodoStore {
  constructor (db) {
    this.db =
      db || new Datastore({ filename: './data/todos.db', autoload: true })
  }

  async add (title, importance, dueDate, description, completed) {
    const todo = new Todo(
      title,
      importance,
      dueDate,
      todoStore.getTodayDate(),
      description,
      completed
    )
    return this.db.insert(todo)
  }

  async get (id) {
    return this.db.findOne({ _id: id })
  }

  async all () {
    return this.db.find({})
  }

  async update (
    id,
    title,
    importance,
    dueDate,
    creationDate,
    description,
    completed
  ) {
    const todo = new Todo(
      title,
      importance,
      dueDate,
      creationDate,
      description,
      completed
    )
    await this.db.update({ _id: id }, { $set: todo }, {})
    return this.get(id)
  }

  async getSortedFilteredTodos (sortBy, sortDirection, filterOnCompleted) {
    const allTodos = await this.db.find({})
    let filteredTodos
    if (filterOnCompleted) {
      filteredTodos = allTodos.filter((todo) => todo.completed !== 'on')
    } else {
      filteredTodos = allTodos
    }

    return filteredTodos.sort((a, b) => {
      if (a[sortBy].length === 0 && b[sortBy].length === 0) {
        return 0
      } else if (a[sortBy].length === 0) {
        return 1
      } else if (b[sortBy].length === 0) {
        return -1
      } else {
        return (
          sortDirection === 'desc'
            ? a[sortBy] > b[sortBy]
            : a[sortBy] < b[sortBy]
        )
          ? 1
          : -1
      }
    })
  }

  getTodayDate () {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }
}

export const todoStore = new TodoStore()
