import moment from 'moment';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addBudget} from '../../redux/actions/expenseActions';
class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      month: '',
    };
  }

  componentDidMount() {}

  addBudget = () => {
    let {amount} = this.state;
    this.props.addBudget({amount});
  };

  render() {
    let {amount, month} = this.state;
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
          value={month}
          placeholder="Month"
          onChangeText={(amount) => this.setState({amount})}
          style={{borderWidth: 1, height: 45, padding: 5, marginTop: 20}}
        />
        <TouchableOpacity
          onPress={this.addBudget}
          style={{marginTop: 10, borderWidth: 1}}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>
            Add Budge
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {addBudget})(AddBudget);
