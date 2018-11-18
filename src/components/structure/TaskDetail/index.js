import React, { Component } from 'react';
import View from './View';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.taskState = {
          name: '',
          description: 'enter label',
          tags: [],
        };
            
    this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(currentTask) {
    currentTask.description = this.taskState.description;
    currentTask.name = this.taskState.name;
    currentTask.tags = this.taskState.tags;
  }

  render() {
        return <View taskName={this.taskState.name}
        taskDescription={this.taskState.description}
        taskTage={this.taskState.tags}
        handleSubmit={this.handleSubmit} />;

  }

}

export default TaskDetail;