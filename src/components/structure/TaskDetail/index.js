import React, { Component } from 'react';
import View from './View';
import { InitialTask } from '../../Utilities/GeneralContent';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
    }

    onChange(newCurrentTask) {
        this.setState((state) => {
            state.currentTask = newCurrentTask;
            return state;
        });
    }

    onClick(sectionClicked) {
    }

    render() {
 
    }

}

export default TaskDetail;