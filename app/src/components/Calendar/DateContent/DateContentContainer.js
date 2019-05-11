import { connect } from 'react-redux';
import DateContent from './DateContent';
import { recipesCalendarWithDataSelector } from '../../../redux/Calendar/selectors';
import { RECIPE } from '../../../redux/Recipe/actions';
import { combineSelectors } from '../../../constants/helpers';

const mapStateToProps = combineSelectors(s =>
  recipesCalendarWithDataSelector(s[RECIPE].recipes)(s)
);

export default connect(mapStateToProps)(DateContent);
