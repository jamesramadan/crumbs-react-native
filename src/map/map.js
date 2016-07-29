import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  MapView,
  TouchableHighlight,
  Text,
} from 'react-native';

/* eslint-disable no-console */
const log = (...args) => console.log(...args);
/* eslint-enable no-console */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#efefef',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: '',
      newRoom: true,
    };
  }

  componentDidMount() {
    this.listenForGeoChange();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  listenForGeoChange() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      const coordStr = this.createChatRoomId(position.coords);
      if (coordStr !== this.state.coords) {
        this.setState({ coords: coordStr }, () => this.checkForChatRoom());
      } else {
        this.setState({ newRoom: false });
      }
    });
  }

  checkForChatRoom() {
    this.props.socket.emit('updateMessagesState', this.state.coords);
    this.props.socket.on('updateMessagesState', result => {
      log('result of updateMessagesState', result);
      if (result === null) {
        this.setState({ newRoom: true });
      } else {
        this.setState({ newRoom: false });
      }
    });
  }

  createChatRoomId(coordObj) {
    const latStr = (Math.trunc(coordObj.latitude * 1000) / 1000).toFixed(3).toString();
    const lngStr = (Math.trunc(coordObj.longitude * 1000) / 1000).toFixed(3).toString();
    return latStr + lngStr;
  }

  createNewChatRoom() {
    log('creating new chat room at', this.state.coords);
    this.props.socket.emit('createChatRoom', this.state.coords);
    this.props.navigator.push({
      name: 'chatroom',
    });
  }

  enterExistingChatRoom() {
    this.props.navigator.push({
      name: 'chatroom',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation
          followUserLocation
        />
        {
          this.state.newRoom ?
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.createNewChatRoom()}
            >
              <Text style={styles.buttonText}>Create New Room</Text>
            </TouchableHighlight> :
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.enterExistingChatRoom()}
            >
              <Text style={styles.buttonText}>Join Existing Room</Text>
            </TouchableHighlight>
        }
      </View>
    );
  }
}

Map.propTypes = {
  navigator: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
};
