import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  MapView,
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
        />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
