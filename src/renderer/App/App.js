import React, { Component } from 'react';
import Frame from '../components/structure/Frame';
import Model from '../model/Model';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import { getTestTaskListSmall } from '../test_resources/testutils'

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

  render() {
    return (
      <div className="App">
        {<Frame model={this.model}/>}
      </div>
    );
  }

}

export default App;
