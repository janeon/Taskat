// creating the list of tasks
import React, { Component } from 'react';
import View from "./View"

class TaskList extends Component {

    constructor(props) {
        super(props);
        
    }

    render() { 
        // convert task objects to task elements (should this be its own function?)
        var taskList = [{text: "sleep"}, {text: "eat"}, {text: "wake up "}];
        var taskElementList = taskList.map((el) => {
            return <div className="task">{el.text}</div>
        });

        return (
            <View taskElementList={taskElementList}/>
        );
    }

}

export default TaskList;