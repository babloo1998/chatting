import React from 'react';
// import './App.css';
import Chat from './frontend/chat'
import './main.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
}
render(){
  return (
    <div className="App">
      <p>Blind Chatting</p>
      <Chat/>
    </div>
  );
}
}

export default App;
