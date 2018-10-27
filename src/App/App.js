import React, { Component } from 'react';
import Frame from '../components/Frame';
import Model from '../Model/Model';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.model = new Model();
  }

  render() {
    this.allTasks = this.model.getAllTasks();
    return (
      <div className="App">
        <Frame tasks={this.allTasks}/>
      </div>
    );
    
  }

}

export default App;
