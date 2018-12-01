import React, { Component } from 'react';
import View from './View';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '_name',
          description: '_description',
          tags: [],
        };

    this.taskKey = props.taskKey;

    this.currentTask = props.currentTask;

    this.model = props.model;
            
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    }

  handleSubmit(event) {
    event.preventDefault();
    
    // make onChange track values in state (event.target.value)

    currentTask.description = this.state.currentTask.taskName;
    currentTask.name = this.state.name;
  }

  handleChange(event) {
    this.setState({name: event.target.name, description: event.target.description});
  }

  handleDelete(currentTask) {
    this.state = null;
  }

  componentWillUnmount() {

  }

     /*
     * A lifecycle method that tracks updates to 'props'
     * (necessary because constructor is only called once)
     */
    componentWillReceiveProps(newProps) {
      this.taskKey = newProps.taskKey;

      this.currentTask = newProps.currentTask;

      this.model = newProps.model;

      console.log("HEHREOURW", this.taskKey, this.currentTask, this.model);
    }

  render() {
        return <View taskName={this.state.name}
        taskDescription={this.state.description}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}/>;
  }

}

export default TaskDetail;
