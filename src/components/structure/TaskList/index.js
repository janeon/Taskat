import React, { Component } from 'react';
import View from "./View"

/*
 * Renders the list of tasks, and also creates the button for adding new tasks.  
 */
class TaskList extends Component {

    constructor(props) {
        super(props);
        
        this.model = props.model;
        // setting the initial state
        this.state = {
            taskTitles: [ { key:-2, title: "no tasks to display..." } ]
        };
    }

    /*
     * This is a lifecycle method from React.Component that gets called after this 
     * component is loaded into the DOM.  
     */
    componentDidMount() {
        // The TaskList wants to know when the list of tasks changes.
        this.model.subscribeTo(this, "title_key_list");
    }

    // Another lifecycle method, that gets called before it is removed from the DOM. 
    componentWillUnmount() {
        this.model.unsubscribeFrom(this, "title_key_list");
    }

    /*
     * When the list of titles changes, this component should update its state to reflect 
     * the new title list.
     */
    onChange(newTitles) {
        this.setState((state) => {
            state.taskTitles = newTitles;
            return state;
        });
    }

    /*
     * Update the current task in the model on task element clicks. 
     */
    onClick(key) {
        this.model.updateCurrentTask(parseInt(key));
    }

    // TODO -> Create the button that adds new tasks, pass it an on click method

    render() {
        // converting task objects to task elements
        const taskTitleElementList = this.state.taskTitles.map((titleKeyPair) => {
            const key = titleKeyPair.key;
            return <div className="task" 
                        onClick={(e) => this.onClick(key)}
                        key={titleKeyPair.key}>
                            {titleKeyPair.title}
                    </div>;
        });

        return <View taskTitleElementList={taskTitleElementList}/>;
    }
}

export default TaskList;
