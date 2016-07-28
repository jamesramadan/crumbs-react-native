import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';

const windowSize = Dimensions.get('window');
const PULLDOWN_DISTANCE = 40;

export default class Chatroom extends Component {
  constructor(props) {

    super(props); // provides access to props.socket

    this.state = {
      message: null,
      messageList: [],
      location: '37.784-122.409',
      demoMode: true,
      userLoggedIn: false,
      username: 'Hannah Test Person'
    }

    this.emitAddMessageToChatRoom();
    this.getMessagesOnMount();

  }

  componentWillMount() {
    this.getMessagesOnMount = this.getMessagesOnMount.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.getMessagesOnMount();
  }

  onSendPress() {
    this.emitAddMessageToChatRoom()
    this.setState({ message: ''})
  }

  // TODO: Get actual username and location
  emitAddMessageToChatRoom() {
    this.props.socket.emit('addMessageToChatRoom', { 
        location: this.state.location,
        message: this.state.message,
        username: this.state.username 
      });
  }

  getMessagesOnMount() {
    this.props.socket.on('updateMessagesState', updatedChatRoom => {
      const messages = updatedChatRoom ? updatedChatRoom.messages : null;
      this.setState({ messageList: messages });
    })
  }

  // TODO: Add functionality to back-button
  onBackPress() {
    this.props.navigator.push({
      name: 'map'
    })
  }

  // TODO: Turn list into separate component
  render() {
    var list = this.state.messageList.map((item, index) => {
      return (
        <View
          style={styles.messageContainer}
          key={index}
          >
          <Text style={this.nameLabel}>
            {item.username}
            <Text style={styles.messageLabel}> : {item.message}</Text>
          </Text>
        </View>
      )
    })
    
    list.reverse(); // display most recent messages first

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
        <View style={styles.chatContainer}>
          <ScrollView
            ref={(c) => this._scrollView = c}
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            
          >
          {list}
          </ScrollView>
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
    paddingTop: 20,
  },
  chatContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch',
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
    color: 'black',
    fontSize: 15
  },
  input: {
    width: windowSize.width - 70,
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: 32,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },

});
