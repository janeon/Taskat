// creating the list of tasks
import React, { Component } from 'react';
import View from "./View"

class TaskList extends Component {

    render() { 
        // convert task objects to task elements (should this be its own function?)
        var taskList = this.props.tasks
        var taskElementList = taskList.map((el) => {
            return <div className="task" key={el.key}>{el.title}</div>
        });

        return (
            <View taskElementList={taskElementList}/>
        );
    }

}

export default TaskList;