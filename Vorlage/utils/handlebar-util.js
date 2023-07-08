export const helpers = {
  daysUntilDueDateText: function (dueDate) {
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
        return "Can't calculate";
    }
  },
};

const calculateDaysUntilDate = (dateString) => {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const inputDate = new Date(dateString).setHours(0, 0, 0, 0);
  const daysUntilDate = (inputDate - currentDate) / (1000 * 60 * 60 * 24);
  return daysUntilDate;
};
