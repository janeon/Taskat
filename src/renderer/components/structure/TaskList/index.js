import React, { Component } from 'react';
import View from "./View"
import 'font-awesome/css/font-awesome.min.css';
import NewTaskButton from './NewTaskButton';
import ReactTooltip from 'react-tooltip'
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
        this.newTask = this.newTask.bind(this)
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

    newTask(key) {
      var list = this.model.resources.taskList;
      if (this.model.createTask(key)) {
        var targetIndex = 0;
        // const targetIndex = list.findIndex(task => task.data.title === key);
        for (var i = 0; i < list.length; i++) {
          if (list[i].data.title === key)
            targetIndex = list[i].data.key;
        }
        console.log("target",targetIndex);
        this.onClick(parseInt(targetIndex));
        return true;
      }
      else return false;
    }

    /*
     * Update the current task in the model on task element clicks.
     */
    onClick(key) {
      // console.log("onclick key", key);
      // console.log("all tasks", this.model);
        this.model.updateCurrentTask(parseInt(key));
        // refresh the task
        this.setState((state) => {
            state.currentTaskKey = key;
            return state;
        });
    }

    onDeleteTask(key) {
      const sure = window.confirm("Are you sure you want to delete this task?");
      if (sure) this.model.deleteTask(key);
    }

    makeFierce() {
        var tabContainer = document.getElementById("tab-list-container");
        var displayContainer = document.getElementById("displayContainer");
        if (!tabContainer.classList.contains("rawr")) {
            tabContainer.classList.add("rawr");
            displayContainer.classList.add("hiss");
        } else {
            tabContainer.classList.remove("rawr");
            displayContainer.classList.remove("hiss");
        }
    }

    render() {
      // console.log("task props", this.props.model);
        // converting task objects to task html elements
        const taskTitleElementList = this.state.titleKeyList.map((titleKeyPair) => {
            const key = titleKeyPair.key;
            var ret =
              <div key={key}>
                <div
                className={(this.state.currentTaskKey === key) ? "currentTask" : "task"}
                            onClick={(e) => this.onClick(key)}
                            key={key}>
                                {titleKeyPair.title}
                </div>
                <div className="taskDelete" onClick={(e) => this.onDeleteTask(key)} data-tip="To delete the current task: use (⌘ + ⌫)">
                  <i className="fa fa-times"></i>
                </div>
                <ReactTooltip />
              </div>
              ;
            return ret;
        });

        const deleteButton = <button className="deleteButton" onClick={(e)=>this.onDeleteTask(this.state.currentTaskKey)}> Delete Task </button>;
        // for deleting current tasks

        const newTaskButton =
        <div className="task" id="new-task-button-container">
            <NewTaskButton
            createTask={this.newTask}
            ref="NewTabButton"/>
        </div>
        ;

        return <View
        taskTitleElementList={taskTitleElementList}
        deleteButton={deleteButton}
        newTaskButton={newTaskButton}
        makeFierce={this.makeFierce}
        />;
    }
}

export default TaskList;
