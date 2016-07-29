import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import styles from './chatroom.styles';
import imgUrl from './profileIcon.png';

/* eslint-disable no-console */
const log = (...args) => console.log(...args);
/* eslint-enable no-console */

export default class Chatroom extends Component {
  constructor(props) {
    super(props); // provides access to props.socket

    // TODO: Incorporate actual, dynamic data
    this.state = {
      message: '',
      messageList: [],
      location: '37.784-122.409',
      userLoggedIn: false,
      username: 'Hannah Test Person',
      imgUrl: 'http://fany.savina.net/wp-content/uploads/2010/04/silhouette.jpg',
    };

    this.props.socket.emit('updateMessagesState', this.state.location);
  }

  componentWillMount() {
    this.getMessagesOnMount = this.getMessagesOnMount.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.getMessagesOnMount();
  }

  onSendPress() {
    if (this.state.message) {
      this.emitAddMessageToChatRoom();
      this.setState({ message: '' });
      this.msgInput.setNativeProps({ text: '' });
    }
  }

  onBackPress() {
    this.props.navigator.push({
      name: 'map',
    });
  }

  onLogoutPress() {
    this.props.navigator.push({
      name: 'login',
    });
  }

  getMessagesOnMount() {
    this.props.socket.on('updateMessagesState', updatedChatRoom => {
      const messages = updatedChatRoom ? updatedChatRoom.messages : [];
      this.setState({ messageList: messages });
    });
  }

  // TODO: Get actual username and location
  emitAddMessageToChatRoom() {
    log(this.state.message);
    this.props.socket.emit('addMessageToChatRoom', {
      location: this.state.location,
      message: this.state.message,
      username: this.state.username,
    });
  }

  // TODO: Turn list into separate component
  render() {
    const list = this.state.messageList.map((item, index) => (
      <View
        style={styles.listItem}
        key={index}
      >
        <View style={styles.listIcon}>
          <Image
            style={styles.channelIcon}
            defaultSource={imgUrl}
            source={{ uri: item.imgUrl }}
          />
        </View>
        <View style={styles.listInfo}>
          <Text style={styles.titleLabel}>{item.message}</Text>
          <Text style={styles.memberLabel}>{item.username}</Text>
        </View>
      </View>
      )
    );

    list.reverse(); // display most recent messages first

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.topContainerLeft}>
            <TouchableHighlight
              style={styles.touchable}
              underlayColor={'#dcf4ff'}
              onPress={this.onBackPress}
            >
              <Text style={{ color: 'black' }}>&lt; Back</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.topContainerRight}>
            <TouchableHighlight
              style={styles.touchable}
              underlayColor={'#dcf4ff'}
              onPress={this.onLogoutPress}
            >
              <Text>Logout &gt;</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.chatContainer}>
          <ScrollView
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
              ref={component => (this.msgInput = component)}
              onChangeText={(text) => this.setState({ message: text })}
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

Chatroom.propTypes = {
  navigator: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
};
