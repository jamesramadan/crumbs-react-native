import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
                  <Image source={require("./cookie.jpg")} />
                  <Text style={styles.header}> Crumbs </Text>
                  <TextInput
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})}
                    placeholder={'Enter User Nickname'}
                    maxLength={12}
                    multiline={false}
                    />
                 <TouchableHighlight
                    style={styles.button}
                    underlayColor={'#328FE6'}
                    onPress={this.onPress.bind(this)}
                    >
                    <Text style={styles.label}>LOGIN</Text>
                </TouchableHighlight>
        </View>
      </View>
    );
  }

  onPress() {
    console.log(this.state.username);
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
    fontSize: 60,
    color: 'orange'
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