// creating the list of tasks
import React, { Component } from 'react';
import View from "./View"

class TaskList extends Component {

    constructor(props) {
        super(props);
        
        this.model = props.model;
        // setting the initial state
        this.state = {
            taskTitles: ["no tasks to display..."]
        }

        this.onChange.bind(this);
    }

    /*
     * This is a lifecycle method from React.Component that gets called after this 
     * component it loaded into the DOM.  
     */
    componentDidMount() {
        // The TaskList wants to know when the list of tasks changes. 
        this.model.allTasks.subscribe(this);
        // Setting the component's initial state
        this.onChange();
    }

    // Another lifecycle method, that gets called before it is removed from the DOM. 
    componentWillUnmount() {
        this.model.allTasks.unsubscribe(this);
    }

    // I think I will change this to subscribe exlusively to the title list.  
    onChange(newData) {
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