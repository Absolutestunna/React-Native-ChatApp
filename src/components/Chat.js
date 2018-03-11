import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Backend from '../Backend';
console.log('Backend', Backend);


class Chat extends Component {
  state = {
    messages: []
  }

  componentDidMount(){
    Backend.loadMessages(message => {
      this.setState(prevState => {
        return {
          messages: GiftedChat.append(prevState.messages, message)
        };
      });
    });
  }

  componentWillUnmount(){
    Backend.closeChat();
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  render(){
    return (
        <GiftedChat
           messages={this.state.messages}
           onSend={message => Backend.sendMessage(message)}
           user={{
             _id: Backend.getUid(),
             name: this.props.clientName
           }}
         />
    )
  }
}

Chat.defaultProps = {
  clientName: ''
}

Chat.propTypes = {
  clientName: PropTypes.string
}

export default Chat;
