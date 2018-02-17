/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';

import {
  Router,
  Scene
} from 'react-native-router-flux'

//local components
import Home from './src/components/Home';
import Chat from './src/components/Chat';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home} title="Home">
          </Scene>
          <Scene key="chat" component={Chat} title="Chat">
          </Scene>
        </Scene>
      </Router>
    );
  }
}
