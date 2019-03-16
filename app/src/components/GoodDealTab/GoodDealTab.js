import styles from './GoodDealTab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import GoodDealItem from '../GoodDealItem/GoodDealItem';
import { combineSelectors } from '../../constants/helpers';
import { goodDealsSelector } from '../../redux/GoodDeal/selectors';

const GoodDealTab = ({ goodDeals }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {goodDeals.map((goodDeal, i) => (
      <GoodDealItem key={i} {...goodDeal} />
    ))}
  </ScrollView>
);

const mapStateToProps = combineSelectors((s, { goodDeals }) => goodDeals || goodDealsSelector(s));

export default connect(mapStateToProps)(GoodDealTab);
