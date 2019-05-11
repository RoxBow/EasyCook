import { compose, withStateHandlers } from 'recompose';
import Calendar from './Calendar';
import { DATE } from '../../../constants/global';

export default compose(
  withStateHandlers(
    ({ selectedMonth = DATE.month[new Date().getMonth()] }) => ({
      selectedMonth,
      indexSelectedMonth: new Date().getMonth()
    }),
    {
      onSelectMonth: () => (month, indexMonth) => ({
        selectedMonth: month,
        indexSelectedMonth: indexMonth
      })
    }
  )
)(Calendar);