import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getExpenseSummary} from '../../redux/actions/expenseSummaryActions';
import {getExpenseHistory} from '../../redux/actions/expenseHistoryActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getExpenseSummary();
    this.props.getExpenseHistory();
    console.log(this.props.expenseHistory);
  }

  toAddBudget = () => {
    this.props.navigation.navigate('addBudget');
  };

  toAddExpense = () => {
    this.props.navigation.navigate('addDailyExpense');
  };

  render() {
    let {expenseSummary, expenseHistory} = this.props;
    return (
      <View style={{flex: 1}}>
        {expenseSummary.summary && (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-around',
            }}>
            <View>
              <Text>Total</Text>
              <Text>{expenseSummary.summary.total}</Text>
            </View>
            <View>
              <Text>Available</Text>
              <Text>{expenseSummary.summary.available}</Text>
            </View>
            <View>
              <Text>Spend</Text>
              <Text>{expenseSummary.summary.spend}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={this.toAddBudget}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: 20,
            width: 80,
            height: 80,
            backgroundColor: 'grey',
            borderRadius: 50,
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={this.toAddExpense}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: 20,
            width: 80,
            height: 80,
            backgroundColor: '#aabb',
            borderRadius: 50,
          }}></TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let {expenseSummary, expenseHistory} = state;

  return {expenseSummary, expenseHistory};
};

export default connect(mapStateToProps, {getExpenseSummary, getExpenseHistory})(
  Dashboard,
);
