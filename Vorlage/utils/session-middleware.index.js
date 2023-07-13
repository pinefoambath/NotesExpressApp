export const sessionUserSettings = (req, res, next) => {
  const userSettings = req.session?.userSettings || {
    sortBy: "title",
    sortDirection: -1,
    filterOnCompleted: false,
    isDarkMode: false,
  };
  const { sortBy, isFilterOnCompletedClicked, isChangeStyleClicked } =
    req.query;

  if (sortBy) {
    if (userSettings.sortBy === sortBy) {
      userSettings.sortDirection = -userSettings.sortDirection;
    } else {
      userSettings.sortDirection = -1;
    }
    userSettings.sortBy = sortBy;
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
