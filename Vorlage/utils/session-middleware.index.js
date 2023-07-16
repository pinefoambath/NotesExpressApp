export const sessionUserSettings = (req, res, next) => {
  const userSettings = req.session?.userSettings || {
    sortBy: "title",
    sortDirection: 'asc',
    filterOnCompleted: false,
    isDarkMode: false,
  };

  const { sortBy, sortDirection, isFilterOnCompletedClicked, isChangeStyleClicked } = req.query;
  if (sortBy) {
    userSettings.sortBy = sortBy;
  }
  if (sortDirection) {
    userSettings.sortDirection = sortDirection;
  }
  if (isFilterOnCompletedClicked) {
    userSettings.filterOnCompleted = !userSettings.filterOnCompleted;
  }
  if (isChangeStyleClicked) {
    userSettings.isDarkMode = !userSettings.isDarkMode;
  }
  req.userSettings = req.session.userSettings = userSettings;
  next();
};

