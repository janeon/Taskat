// creating the list of tasks
import React, { Component } from 'react';
import View from "./View"
import Model from '../../Model/Model'

class TaskList extends Component {

    constructor(props) {
        super(props);
        // this.model = props.model;
        // not sure where model was coming from  and it was creating errors so I'm just gonna make a new one here
        this.model = new Model();
        // setting the initial state
        this.state = {
            taskTitles: ["no tasks to display..."]
        }

        this.onChange.bind(this);
    }

    componentDidMount() {
        // The TaskList wants to know when the list of tasks changes.
        this.model.allTasks.subscribe(this);
        // Setting the component's initial state
        this.onChange();
    }

    componentWillUnmount() {
        this.model.allTasks.unsubscribe(this);
    }

    // ignore the data that gets passed in...
    onChange() {
        this.setState((state) => {
            state.taskTitles = this.model.getAllTaskTitles();
            return state;
        });
    }

    render() {
        // convert task objects to task elements (should this be its own function?)
        const taskTitleElementList = this.state.taskTitles.map((title) => {
            return <div className="task" key={title}>{title}</div>;
        });

        return <View taskTitleElementList={taskTitleElementList}/>;
    }
}

export default TaskList;
