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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  onButtonPress() {
    console.log(this.state.username);
    this.props.navigator.push({
      name: 'map'
    })
  }
  
  onLinkPress() {
    console.log(this.state.username);
    this.props.navigator.push({
      name: 'signup'
    })
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
                    onPress= {() => this.onButtonPress()}
                    >
                    <Text style={styles.label}>LOGIN</Text>
                </TouchableHighlight>
                <Hyperlink>
                            <View>
                                <Text style={{fontSize:15}}>
                                Not a member? <Text onPress={() => this.onLinkPress()} style={{color: 'blue', fontSize:15}}>Create a Profile</Text>
                                </Text>
                            </View>
                </Hyperlink>
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
