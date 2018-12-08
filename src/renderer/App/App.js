import React, { Component } from 'react';
import Frame from '../components/structure/Frame';
import Model from '../model/Model';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import { getTestTaskListSmall } from '../test_resources/testutils'

 var map = {49: false, // 1
            50: false, // 2
            51: false, // 3
            52: false, // 4
            17: false, // left ctrl
            91: false, // left command
            93: false, // right command
            37: false, // left arrow
            39: false, // right arrow
            18: false, // right option
            78: false, // N
            65: false,
            67: false, // cmd + N
             8: false, // back
            87: false,
            83: false,
            68: false};


class App extends Component {
  constructor(props) {
      super(props);
      // this reference to the model gets passed down through the tree
      // this is just for testing..
      this.model = new Model();
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.model.writeAppState);
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.model.writeAppState);
  }
  // Create a named function as your event handler

  handleKeyDown(e) {
    var cmd = [49,50,51,52,53,54,78]
    var pressed = e.keyCode;
    var count = 0; var code = 0;
    // console.log("heard keydown", map[93] && map[8]);
    if (e.keyCode in map) {
        // console.log("mapped key", pressed);
        map[e.keyCode] = true;

        // if (map[67]) // new task
          //this.refs.Frame.refs.TaskList.refs.NewTabButton.refs.NewTabButtonInput.focus();
        if ((map[93]) && (map[8])) { // delete task shortcut
          // console.log("current task key", this.model.resources.currentTask.data.key);
          const sure = window.confirm("Are you sure you want to delete this task?");
          map[91] = false;
          map[93] = false;
          map[8] = false;
          if (sure) this.model.deleteTask(this.model.resources.currentTask.data.key);
        }
      }
    }

    handleKeyUp(e) {
      // console.log("keyup", e.keyCode);
      if (e.keyCode in map) {
          map[e.keyCode] = false;
          if (e.keyCode === 91 || e.keyCode === 93) {
            for (var key in map)
              map[key] = false;
          }
        }
    }

  render() {
    return (
      <div className="App">
        {<Frame model={this.model} ref="Frame"/>}
      </div>
    );
  }

}


export default App;
