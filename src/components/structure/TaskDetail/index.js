import React, { Component } from 'react';
import View from './View';
import { InitialTask } from '../../Utilities/GeneralContent';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.taskState = {
          name: date,
          description: 'enter label',
          tags: [],
        };
    }

  handleSubmit(currentTask) {
    currentTask.description = this.taskState.description;
    currentTask.name = this.taskState.name;
    currentTask.tags = this.taskState.tags;
  }

  render() {
        return <View taskName={this.state.name}
        taskDescription={this.state.description}
        taskTage={this.state.tags}
        handleSubmit={this.handleSubmit} />;

  }

}

export default TaskDetail;