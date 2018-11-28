import React, { Component } from 'react';
import Frame from '../components/structure/Frame';
import Model from '../model/Model';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import { getTestTaskListSmall } from '../test_resources/testutils'

var keydownListener = function (e) {
  if (e.keyCode === 13) {
    // Do your stuff here
    console.log("enter pressed");
  }
  console.log("other keys");
};

// Bind "keydown" event
addEventListener("keydown", keydownListener);

class App extends Component {
  constructor(props) {
      super(props);
      // this reference to the model gets passed down through the tree
      // this is just for testing..
      this.model = new Model();
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.model.writeAppState);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.model.writeAppState);
  }
  // Create a named function as your event handler

  render() {
    return (
      <div className="App">
        {<Frame model={this.model}
                keydownListener = {keydownListener}/>}
      </div>
    );
  }

}


export default App;
