import { todoStore } from "../services/todo-store.js";

export class IndexController {
  index = async (req, res) => {
    const sortBy = req.session.userSettings.sortBy;
    const sortDirection = req.session.userSettings.sortDirection;
    const filterOnCompleted = req.session.userSettings.filterOnCompleted;
    const isDarkMode = req.session.userSettings.isDarkMode;
    let todos = await todoStore.getSortedFilteredTodos(
      sortBy,
      sortDirection,
      filterOnCompleted,
    );
    res.render("index", {
      todos,
      sortBy: sortBy,
      sortDirection: sortDirection,
      filterOnCompleted: filterOnCompleted,
      isDarkMode: isDarkMode,
    });
  };
}

export const indexController = new IndexController();
