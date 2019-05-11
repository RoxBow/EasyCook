import ListDay from './ListDay';
import { compose, withProps } from 'recompose';

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const generateMonthDays = indexMonth => {
  let monthDays = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const daysIncurrentMonth = daysInMonth(indexMonth, currentYear);
  const lastDayMonth = new Date(currentYear, indexMonth, daysIncurrentMonth);

  for (let d = new Date(currentYear, indexMonth, 1); d < lastDayMonth; d.setDate(d.getDate() + 1)) {
    monthDays.push(new Date(d));
  }

  return monthDays;
};

export default compose(
  withProps(({ indexSelectedMonth }) => ({
    listDays: generateMonthDays(indexSelectedMonth)
  }))
)(ListDay);
