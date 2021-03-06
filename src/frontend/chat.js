import React, { Component } from 'react'
import ChatInput from './chatInput'
import ChatMessage from './chatMessage'

const URL = 'https://murmuring-sands-94333.herokuapp.com/'

class Chat extends Component {
  state = {
    name: '',
    messages: [],
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      console.log(' hello you are connected')
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('you got disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    const message = { name: this.state.name, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
      <div>
        <label htmlFor="name">
          <span>Name:&nbsp;</span>
          <input
            className="name"
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <div className="message-wrapper">
        <div className="message">
            <span>Message:</span>
            <ChatInput
              ws={this.ws}
              onSubmitMessage={messageString => this.submitMessage(messageString)}
            />
        </div> 
        <div className="message-container">
          {this.state.messages.map((message, index) =>
            <ChatMessage
              key={index}
              message={message.message}
              name={message.name}
            />,
          )}
        </div>  
        </div>
      </div>
    )
  }
}

export default Chat