import React, { Component } from 'react';
import Frame from '../components/Frame';
import Model from '../Model/Model';
import './App.css';
import { getTestTaskListSmall } from '../TestResources/testutils'

class App extends Component {
  constructor(props) {
      super(props);
      // this reference to the model gets passed down through the tree
      // this is just for testing..
      this.model = new Model(true, getTestTaskListSmall());
  }

  render() {
    return (
      <div className="App">
        <Frame model={this.model}/>
      </div>
    );
  }

}

export default App;
