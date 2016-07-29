import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  validateUser() {
    this.props.socket.emit('validateUserSignup', { 
        username: this.state.username,
        password: this.state.password
    });
  }

  componentWillMount() {
    this.props.socket.on('Authentication', username => {
      console.log('heyo');
      console.log(username);
    })
  }

  onPress() {
    console.log(this.state.username);
    this.props.navigator.push({
      name: 'map'
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
            <Text style={styles.header}> Crumbs </Text>
            <Text style={styles.subheader}> Create a Profile </Text>
            <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={(text) => this.setState({username: text})}
              placeholder={'Enter Username'}
              maxLength={12}
              multiline={false}
              />
            <TextInput
                style={styles.input}
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                placeholder={'Enter Password'}
                maxLength={12}
                multiline={false}
            />
           <TouchableHighlight
              style={styles.button}
              underlayColor={'#328FE6'}
              onPress={() => this.validateUser()}
              >
              <Text style={styles.label}>SIGN UP</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    fontSize: 60,
    color: 'orange'
  },
  subheader: {
    alignItems: 'center',
    fontSize: 20,
    color: 'black'
  },
  input: {
      width: 250,
      color: '#555555',
      padding: 10,
      height: 50,
      borderColor: '#32C5E6',
      borderWidth: 1,
      borderRadius: 4,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
  },
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#328FE6',
      padding: 10,
      marginTop: 10,
      backgroundColor: '#32c5e6'
  },
  label: {
      width: 230,
      flex: 1,
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
      color: '#ffffff'
  }
});


