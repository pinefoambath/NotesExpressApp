import { todoStore } from '../services/todo-store.js'

export class IndexController {
  index = async (req, res) => {
    req.session.userSettings.sortBy = req.query.sortBy || req.session.userSettings.sortBy
    req.session.userSettings.sortDirection = req.query.sortDirection || req.session.userSettings.sortDirection
    req.session.userSettings.filterOnCompleted = req.query.filterOnCompleted || req.session.userSettings.filterOnCompleted
    req.session.userSettings.isDarkMode = req.query.isDarkMode || req.session.userSettings.isDarkMode

    const sortBy = req.session.userSettings.sortBy
    const sortDirection = req.session.userSettings.sortDirection
    const filterOnCompleted = req.session.userSettings.filterOnCompleted
    const isDarkMode = req.session.userSettings.isDarkMode

    const todos = await todoStore.getSortedFilteredTodos(
      sortBy,
      sortDirection,
      filterOnCompleted
    )

    res.render('index', {
      todos,
      sortBy,
      sortDirection,
      filterOnCompleted,
      isDarkMode
    })
  }

  toggleCompletedFilter = async (req, res) => {
    req.session.userSettings.filterOnCompleted = !req.session.userSettings.filterOnCompleted
    res.redirect('/todos')
  }

  toggleDarkMode = async (req, res) => {
    req.session.userSettings.isDarkMode = !req.session.userSettings.isDarkMode
    res.redirect('/todos')
  }
}

export const indexController = new IndexController()
