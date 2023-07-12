export const helpers = {
  if_eq: function (a, b, opts) {
    if (a === b) return opts.fn(this);
    else return opts.inverse(this);
  },
  sortingDirectionIcon: function (context, sortBy, sortDirection) {
    if (context === sortBy) {
      if (sortDirection === -1) {
        return "\u25B2";
      } else {
        return "\u25BC";
      }
    } else {
    }
  },
  makeTextBoldIfSelected: function (text, filterOnCompleted) {
    if (filterOnCompleted) {
      return text + " TODO Style: text fett";
    } else {
      return text;
    }
  },
};
