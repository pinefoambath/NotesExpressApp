export const helpers = {
  daysUntilDueDateText:  (dueDate) => {
    const daysUntilDate = calculateDaysUntilDate(dueDate);
    switch (true) {
      case daysUntilDate === 0:
        return "now";
      case daysUntilDate === -1:
        return "A day ago";
      case daysUntilDate === 1:
        return "In a day";
      case daysUntilDate > 1:
        return `In ${daysUntilDate} days`;
      case daysUntilDate < 1:
        return `${Math.abs(daysUntilDate)} days ago`;
      default:
        return "Someday";
    }
  },
  sortingDirectionIcon:  (context, sortBy, sortDirection) => {
    if (context === sortBy) {
      if (sortDirection === "desc") {
        return "\u25B2";
      } else {
        return "\u25BC";
      }
    } else {
    }
  },
};

const calculateDaysUntilDate = (dateString) => {
  const currentDate = new Date().setUTCHours(0, 0, 0, 0);
  const inputDate = new Date(dateString).setUTCHours(0, 0, 0, 0);
  return (inputDate - currentDate) / (1000 * 60 * 60 * 24);
};
