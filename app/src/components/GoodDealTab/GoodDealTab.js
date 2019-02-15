import styles from './GoodDealTab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import GoodDealItem from '../GoodDealItem/GoodDealItem';

const GoodDealTab = ({ goodDeals }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {goodDeals.map((goodDeal, i) => (
      <GoodDealItem key={i} {...goodDeal} />
    ))}
  </ScrollView>
);

const mapStateToProps = (state, { goodDeals }) => ({
  goodDeals: goodDeals || state.goodDeal.goodDeals
});

export default connect(mapStateToProps)(GoodDealTab);
