import moment from 'moment';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addDailyExpense} from '../../redux/actions/expenseHistoryActions';
class AddDailyExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: '',
    };
  }

  componentDidMount() {}

  addDailyExpense = () => {
    let {amount, description} = this.state;
    if (amount) {
      this.props.addDailyExpense({amount, description});
    }
  };

  render() {
    let {amount, description} = this.state;
    return (
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <TextInput
          value={amount}
          placeholder="Amount"
          onChangeText={(amount) => this.setState({amount})}
          style={{borderWidth: 1, height: 45, padding: 5}}
        />
        <TextInput
          value={description}
          placeholder="Description"
          onChangeText={(description) => this.setState({description})}
          style={{borderWidth: 1, height: 45, padding: 5, marginTop: 20}}
        />
        <TouchableOpacity
          onPress={this.addDailyExpense}
          style={{marginTop: 10, borderWidth: 1}}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {addDailyExpense})(AddDailyExpense);
