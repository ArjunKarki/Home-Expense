import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {}

  render() {
    let {email, password} = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          style={{borderWidth: 1}}
        />
        <TextInput
          placeholder="Password"
          style={{borderWidth: 1, marginTop: 10}}
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity style={{marginTop: 10, borderWidth: 1}}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 10, borderWidth: 1}}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {state};
};

export default connect(mapStateToProps, {})(Login);
