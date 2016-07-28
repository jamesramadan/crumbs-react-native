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

const windowSize = Dimensions.get('window');
const PULLDOWN_DISTANCE = 40;

export default class Chatroom extends Component {
  constructor(props) {

    super(props); // provides access to props.socket

    this.state = {
      message: null,
      messageList: [],
      location: '37.7837-122.4090',
      demoMode: true,
      userLoggedIn: false,
    }

  }

  componentWillMount() {
    this.onSendPress = this.onSendPress.bind(this);
    this.onGetChat = this.onGetChat.bind(this)
  }

  onGetChat() {
    this.props.socket.on('updateMessagesState', updatedChatRoom => {
      console.log('messages received:', updatedChatRoom);
      this.setState({ messageList: updatedChatRoom });
    })
  }

  onSendPress() {
    this.props.socket.emit('addMessageToChatRoom', { 
        location: this.state.location,
        message: this.state.message,
        username: null // TODO: Add Username
      });

    console.log('addMessageToChatRoom:', this.state.message);

    this.setState({
      message: '',
    })

  }

  onBackPress() {
    console.log('navigate back a page');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableHighlight
            underlayColor={'#dcf4ff'}
            onPress={this.onBackPress}
            style={{marginLeft: 15}}
          >
          <Text style={{color: 'black'}}>&lt; Back</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Text style={{color: '#fff'}}>CHAT</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
              value={this.message}
              onChangeText={(text) => this.setState({message: text})}
              />
          </View>
          <View style={styles.sendContainer}> 
            <TouchableHighlight
              underlayColor={'red'}
              onPress={() => this.onSendPress()}
              >
              <Text style={styles.sendLabel}>SEND</Text>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#c2edff',
    paddingTop: 1,
  },
  chatContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#a9e5ff'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  sendContainer: {
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  sendLabel: {
    color: '#ffffff',
    fontSize: 15
  },
  input: {
    width: windowSize.width - 70,
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: 32,
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },

});