import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toAddBudget = () => {
    this.props.navigation.navigate('addBudget');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text> Dashboard </Text>
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
      </View>
    );
  }
}

export default Dashboard;
