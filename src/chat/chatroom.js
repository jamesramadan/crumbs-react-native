import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ListView,
  TouchableHighlight,
  Dimensions,
  StyleSheet
} from 'react-native';

const PULLDOWN_DISTANCE = 40;

export default class Chatroom extends Component {
  constructor(props) {

    super(props); // provides access to props.socket

    this.state = {
      message: null,
      location: '37.7837-122.4090',
      demoMode: true,
      userLoggedIn: false,
    }

  }

  componentWillMount() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(text) {
    this.setState({
      message: text,
    });
  }

  handleSubmit() {
    // ADD MESSAGE TO CHAT ROOM
    props.socket.emit('addMessage', this.message);
    console.log('addMessage:', this.message);

    this.setState({
      message: '',
    })

  }

  onBackPress() {
    console.log('navigate back a page');
  }

// DUPLICATES HANDLE SUBMIT
  onSendPress() {
    console.log(this.state.message);
    this.setState({message: ''});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableHighlight
            underlayColor={'blue'}
            onPress={this.onBackPress}
          >
          <Text>Back</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Text>CHAT</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.message}
              onChangeText={(text) => this.handleInputChange(text)}
              />
          </View>
          <View> 
            <TouchableHighlight
              underlayColor={'red'}
              onPress={() => this.onSendPress()}
              >
              <Text>SEND</Text>
            </TouchableHighlight>
          </View> 
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'blue'
  }

});


      // <View style={styles.container}>
      //   <Text>Chatroom Take 2</Text>
      //   <Text>{this.state.location}</Text>
      // </View>
