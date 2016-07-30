import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  MapView,
  TouchableHighlight,
  Text,
  AlertIOS,
} from 'react-native';

/* eslint-disable no-console */
// const log = (...args) => console.log(...args);
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
      location: '',
      joinRoom: false,
      showAlert: false,
    };

    this.onEachGeoChange = this.onEachGeoChange.bind(this);
    this.handleRoomCheck = this.handleRoomCheck.bind(this);
    this.handleRoomCreation = this.handleRoomCreation.bind(this);

    this.props.socket.on('room:checked', this.handleRoomCheck);
    this.props.socket.on('room:created', this.handleRoomCreation);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(this.onEachGeoChange);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onEachGeoChange(position) {
    const curLocation = this.createLocationStr(position.coords);
    if (curLocation !== this.state.location) {
      this.setState({ location: curLocation }, () => this.checkForRoom());
    }
  }

  createLocationStr(coordObj) {
    const latStr = (Math.trunc(coordObj.latitude * 1000) / 1000).toFixed(3).toString();
    const lngStr = (Math.trunc(coordObj.longitude * 1000) / 1000).toFixed(3).toString();
    return latStr + lngStr;
  }

  checkForRoom() {
    this.props.socket.emit('check:room', this.state.location);
  }

  createRoom() {
    this.props.socket.emit('create:room', this.state.location);
  }

  handleRoomCheck(response) {
    if (response.location === this.state.location) {
      if (response.exists.room === true) {
        this.setState({ joinRoom: true }); // this switches the button to 'Join Room'
      } else {
        this.setState({ joinRoom: false }); // ensures that the
      }
    } else {
      this.checkForRoom();
    }
  }

  handleRoomCreation(response) {
    if (response.room) {
      this.checkForRoom();
    } else {
      this.setState({ showAlert: true });
    }
  }

  joinRoom() {
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
        {this.state.showAlert &&
          AlertIOS.alert(
            'OOPS', 'Could not create a room :(',
            () => this.setState({ showAlert: false }))
        }
        {
          this.state.joinRoom ?
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.joinRoom()}
            >
              <Text style={styles.buttonText}>Join Room!</Text>
            </TouchableHighlight> :
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.createRoom()}
            >
              <Text style={styles.buttonText}>Create New Room!</Text>
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
