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

    this.registerFinalState = props.registerFinalState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    }

  handleSubmit(currentTask) {
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

  render() {
        return <View taskName={this.state.name}
        taskDescription={this.state.description}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}/>;
  }

}

export default TaskDetail;
