import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

window.navigator.userAgent = 'react-native';

const io = require('socket.io-client/socket.io');
const ioConfig = {
  jsonp: false,
  transports: ['websocket'],
};

import Login from './login/login';

const ROUTES = {
  login: Login
}

export default class Crumbs extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:3000', ioConfig);
  }

  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />; 
  }

  render() {
    return (
      <Navigator
        style={ styles.container }
        initialRoute={{name: 'login'}}
        renderScene={this.renderScene}
        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});
