import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';


class Home extends Component {
  state = {
    name: ""
  }
  render(){
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Joshua Abu"
          onChangeText={(text) => {
            this.setState({ name: text })
          }}
          value={this.state.name}
        />
        <TouchableOpacity onPress={() => {
          Actions.chat({
            clientName: this.state.name
          })
        }}>
          <Text style={styles.buttonText}>
            Enter Chat
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Home.defaultProps = {
  clientName: ""
}

Home.propTypes = {
  clientName: PropTypes.string
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20
  },
  nameInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
    padding: 5
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 20
  }
})

export default Home;
