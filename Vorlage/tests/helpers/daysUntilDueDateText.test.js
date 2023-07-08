import { helpers } from "../../utils/handlebar-util.js";
import MockDate from "mockdate";
import { expect } from "chai";

describe("helpers", () => {
  before(() => {
    MockDate.set("2023-07-12T12:00:00.000+02:00");
  });

  after(() => {
    MockDate.reset();
  });

  describe("daysUntilDueDateText", () => {
    it('should return "now" when daysUntilDate is 0', () => {
      const result = helpers.daysUntilDueDateText(new Date());
      expect(result).to.equal("now");
    });

    it('should return "A day ago" when daysUntilDate is -1', () => {
      const result = helpers.daysUntilDueDateText(new Date("2023-07-11"));
      expect(result).to.equal("A day ago");
    });

    it('should return "In a day" when daysUntilDate is 1', () => {
      const result = helpers.daysUntilDueDateText(new Date("2023-07-13"));
      expect(result).to.equal("In a day");
    });

    it('should return "In {daysUntilDate} days" when daysUntilDate is greater than 1', () => {
      const result = helpers.daysUntilDueDateText(new Date("2023-07-15"));
      expect(result).to.equal("In 3 days");
    });

    it('should return "In {daysUntilDate} days" with whole days,also when there is a change in winter/summer time and year', () => {
      const result = helpers.daysUntilDueDateText(new Date("2025-02-04"));
      expect(result).to.equal("In 573 days");
    });

    it('should return "|{daysUntilDate}| days ago" when daysUntilDate is less than 1', () => {
      const result = helpers.daysUntilDueDateText(new Date("2023-07-09"));
      expect(result).to.equal("3 days ago");
    });

    it('should return "|{daysUntilDate}| days ago" with whole days, also when there is a change in winter/summer time and year', () => {
      const result = helpers.daysUntilDueDateText(new Date("2022-01-09"));
      expect(result).to.equal("549 days ago");
    });

    it('should return "Can\'t calculate" when daysUntilDate is undefined', () => {
      const result = helpers.daysUntilDueDateText(undefined);
      expect(result).to.equal("Can't calculate");
    });
  });
});
