import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {requestLogin} from '../../redux/actions/authActions';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'arjun@gmail.com',
      password: 'aaaaaaaaa',
    };
  }

  componentDidMount() {}

  requestLogin = () => {
    let {email, password} = this.state;
    this.props.requestLogin({email, password});
  };

  toSignup = () => {
    this.props.navigation.navigate('signup');
  };

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
          value={email}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          style={{borderWidth: 1, height: 45, padding: 5}}
        />
        <TextInput
          value={password}
          placeholder="Password"
          style={{borderWidth: 1, padding: 5, marginTop: 10, height: 45}}
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity
          onPress={this.requestLogin}
          style={{marginTop: 10, borderWidth: 1}}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 10, borderWidth: 1}}
          onPress={this.toSignup}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {state};
};

export default connect(mapStateToProps, {requestLogin})(Login);
