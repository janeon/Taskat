import React, { Component } from 'react';
import View from './View';
//import { emojisplosion, emojisplosions } from "emojisplosion";

class TaskDetail extends Component {
    constructor(props) {
      super(props);

      this.taskKey = props.taskKey;

      this.currentTask = props.currentTask;

      this.model = props.model;

      this.state = {
          name: this.currentTask.title,
          description: this.currentTask.description,
        };

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDescChange = this.handleDescChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

  handleSubmit(event) {
    event.preventDefault();

    // make onChange track values in state (event.target.value)

    const name = this.state.name;
    const desc = this.state.description;
    this.currentTask.title = name;
    this.currentTask.description = desc;
    this.model.updateTask(this.currentTask);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});

  }

  handleDescChange(event) {
    this.setState({description: event.target.value});
  }

  handleDelete(currentTask) {
    const sure = window.confirm("Congratulations! Would you like to delete this task now?");
    (sure) ? this.model.deleteTask(this.taskKey) : null;
    const { cancel } = emojisplosions();
    setTimeout(cancel, 2000);
  }

   /*
    * A lifecycle method that tracks updates to 'props'
    * (necessary because constructor is only called once)
    */
  componentWillReceiveProps(newProps) {
    this.taskKey = newProps.taskKey;

    this.currentTask = newProps.currentTask;

    this.model = newProps.model;
    this.setState({
          name: this.currentTask.title,
          description: this.currentTask.description,
          tags: [],
        });
    }

  render() {
        return <View name={this.state.name}
        description={this.state.description}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        handleDescChange={this.handleDescChange}
        handleNameChange={this.handleNameChange}/>;
  }

}

export default TaskDetail;
