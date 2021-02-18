import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {requestSignup} from '../../redux/actions/authActions';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: 'Arju nKarki',
      email: 'arjun@gmail.com',
      password: 'aaaaaaaaa',
      confirmPassword: 'aaaaaaaaa',
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  requestSignup = () => {
    let {fullName, email, password, confirmPassword} = this.state;
    this.props.requestSignup({
      fullName,
      email,
      password,
    });
  };

  toLogin = () => {
    this.props.navigation.navigate('login');
  };

  render() {
    let {email, password, fullName, confirmPassword} = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TextInput
          value={fullName}
          placeholder="Full Name"
          onChangeText={(fullName) => this.setState({fullName})}
          style={{borderWidth: 1, padding: 5, marginTop: 10, height: 45}}
        />
        <TextInput
          value={email}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          style={{borderWidth: 1, padding: 5, marginTop: 10, height: 45}}
        />
        <TextInput
          value={password}
          placeholder="Password"
          style={{borderWidth: 1, padding: 5, marginTop: 10, height: 45}}
          onChangeText={(password) => this.setState({password})}
        />
        <TextInput
          value={confirmPassword}
          placeholder="Confirm Password"
          style={{borderWidth: 1, padding: 5, marginTop: 10, height: 45}}
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
        />
        <TouchableOpacity
          onPress={this.requestSignup}
          style={{marginTop: 10, borderWidth: 1}}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 10, borderWidth: 1}}
          onPress={this.toLogin}>
          <Text style={{paddingVertical: 10, alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {state};
};

export default connect(mapStateToProps, {requestSignup})(Signup);
