import React, { Component } from 'react';
import View from "./View"
import 'font-awesome/css/font-awesome.min.css';
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
            titleKeyList: [ { key:-2, title: "no tasks to display..." } ],
            // which task was clicked last
            currentTaskKey: null,
        };
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onClick = this.onClick.bind(this);
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
      // console.log("onclick key", key);
        this.model.updateCurrentTask(parseInt(key));
        // refresh the task
        this.setState((state) => {
            state.currentTaskKey = key;
            return state;
        });
    }

    onDeleteTask(key) {
      this.model.deleteTask(key);
    }


    render() {
      // console.log("task props", this.props.model);
        // converting task objects to task html elements
        const taskTitleElementList = this.state.titleKeyList.map((titleKeyPair) => {
            const key = titleKeyPair.key;
            var ret;
            if (key === this.state.currentTaskKey) {
              ret =
              <div key={titleKeyPair.key}>
                <div className="currentTask"
                            onClick={(e) => this.onClick(key)}
                            key={titleKeyPair.key}>
                                {titleKeyPair.title}
                </div>
                <div className="taskDelete" onClick={(e) => this.onDeleteTask(key)}>
                  <i className="fa fa-times"></i>
                </div>
              </div>
              ;
            }
            else {
              ret = <div key={titleKeyPair.key}>
                      <div className="task"
                        onClick={(e) => this.onClick(key)}
                        key={titleKeyPair.key}>
                            {titleKeyPair.title}
                        </div>
                        <div className="taskDelete" onClick={(e) =>this.onDeleteTask(key)}> <i className="fa fa-times"></i>
                      </div>
                    </div>
                    ;
              }
            return ret;
        });

        const deleteButton = <button class="deleteButton" onClick={(e)=>this.onDeleteTask(this.state.currentTaskKey)}> Delete Task </button>;
        // for deleting current tasks
        return <View
        createTask={this.model.createTask}
        taskTitleElementList={taskTitleElementList}
        deleteButton={deleteButton}
        />;
    }
}

export default TaskList;
