import React, { Component } from 'react';
import View from "./View"

/*
 * Renders the list of tasks, and also creates the button for adding new tasks.  
 */
class TaskList extends Component {

    constructor(props) {
        super(props);
        
        // farthest down the model should go...
        this.model = props.model;
        // setting the initial state
        this.state = {
            titleKeyList: [ { key:-2, title: "no tasks to display..." } ]
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
     * When the list of title/keys changes, this component should update its state to reflect 
     * the new titlekey list.
     */
    onChange(newTitleKeyList) {
        this.setState((state) => {
            state.titleKeyList = newTitleKeyList;
            return state;
        });
    }

    /*
     * Update the current task in the model on task element clicks. 
     */
    onClick(key) {
        this.model.updateCurrentTask(parseInt(key));
    }

    render() {

        // converting task objects to task html elements
        const taskTitleElementList = this.state.titleKeyList.map((titleKeyPair) => {
            const key = titleKeyPair.key;
            return <div className="task" 
                        onClick={(e) => this.onClick(key)}
                        key={titleKeyPair.key}>
                            {titleKeyPair.title}
                    </div>;
        });

        return <View createTask={this.model.createTask} taskTitleElementList={taskTitleElementList}/>;
    }
}

export default TaskList;
