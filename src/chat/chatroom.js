import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import styles from './chatroom.styles';
import imgUrlDefault from './profileIcon.png';
import moment from 'moment';

// TODO: Make repeat functions with map.js more DRY
// TODO: Update all socket messages to reflect changes to server (TBD)

/* eslint-disable no-console */
const log = (...args) => console.log(...args);
/* eslint-enable no-console */

export default class Chatroom extends Component {
  constructor(props) {
    super(props); // provides access to props.socket

    this.state = {
      message: '',
      messageList: [],
      location: '37.784-122.409',
      username: 'default_user',
    };

    // TODO: change socket message to room:joined
    this.props.socket.on('updateMessagesState', updatedChatRoom => {
      const messages = updatedChatRoom ? updatedChatRoom.messages : [];
      this.setState({ messageList: messages });
    });
  }

  componentWillMount() {
    this.onBackPress = this.onBackPress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);

    // TODO: Pull username from async store
    // TODO: Update socket
        // this.props.socket.emit('join:room', {
        //   location: this.state.location,
        //   username: this.state.username,
        // });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = this.createChatRoomId(position);
        this.setState({ location: loc });
        this.props.socket.emit('updateMessagesState', this.state.location);
        this.listenForGeoChange();
      });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  // TODO: if there's a change in geolocation, trigger to see if location (aka chatroom) has changed
  //       if so then navigate away
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

  listenForGeoChange() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      const coordStr = this.createChatRoomId(position.coords);
      if (coordStr !== this.state.location) {
        log('location changed, return to map');
        this.onBackPress();
      }
    });
  }

  createChatRoomId(coordObj) {
    const latStr = (Math.trunc(coordObj.latitude * 1000) / 1000).toFixed(3).toString();
    const lngStr = (Math.trunc(coordObj.longitude * 1000) / 1000).toFixed(3).toString();
    return latStr + lngStr;
  }

  // TODO: Get actual username and location
  emitAddMessageToChatRoom() {
    log(this.state.message);
    // TODO: Change socket message emit('add:mesage')
    this.props.socket.emit('addMessageToChatRoom', {
      location: this.state.location,
      message: this.state.message,
      username: this.state.username,
    });
  }

  // TODO: Turn list into separate component
  // TODO: Change key to equal item._id
  render() {
    const list = this.state.messageList.map((item, index) => (
      <View
        style={styles.listItem}
        key={index}
      >
        <View style={styles.listIcon}>
          <Image
            style={styles.channelIcon}
            defaultSource={imgUrlDefault}
            source={imgUrlDefault}
          />
        </View>
        <View style={styles.listInfo}>
          <Text style={styles.titleLabel}>{item.message}</Text>
          <Text style={styles.memberLabel}>{item.username}</Text>
          <Text style={styles.memberLabel}>{moment(item.createdAt).fromNow()}</Text>
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
              onPress={() => Alert.alert(
                  'LOGOUT',
                    'Exit chatroom and return to login page?',
                [
                  { text: 'CANCEL', onPress: () => log('cancel pressed') },
                  { text: 'OK', onPress: () => this.onLogoutPress() },
                ]
                  )}
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
