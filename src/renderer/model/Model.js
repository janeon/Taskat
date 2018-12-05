import Resources from './Resources';
import PersistentData from './PersistentData';
import { getInitialState, InitialTask } from '../utilities/general_content';

/*
 * This manages connections between components, data, and actions (updates, edits, deletion, etc.).
 *
 * Any components that need information can subscribe to the datasource that they need (and they
 * will be updated (through their 'onChange()' method) when that data is altered).
 *
 * I am thinking that any alterations to the data also occur through this class.
 */
class Model {

    // There is only an initTaskList passed in when 'testing' == true;
    constructor(testing, initTaskList) {

        this.pd = new PersistentData();

        if (testing === undefined) {
            initTaskList = this.pd.read();

            // careful...
            this.pd.clear();
        }

        this.resources = new Resources(initTaskList);

        // binding the 'this' of the functions that get dispersed throughout the app.
        this.registerFinalState = this.registerFinalState.bind(this);
        this.writeAppState = this.writeAppState.bind(this);
        this.createTask = this.createTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.addTabToTask = this.addTabToTask.bind(this);
    }

    writeAppState() {
        this.pd.write(this.resources.getUnwrappedTaskList());
        // good spot to clear all previous data...
        // this.pd.clear();
    }

    /*
     * 'desired_resource' - a string (ie. "task_title_list") that indicates which resource the subscriber wants to
     * know about.
     */
    subscribeTo(obs, desired_resource) {

        switch (desired_resource) {
            case "title_key_list":
                this.resources.titleKeyList.subscribe(obs);
                break;
            case "current_task":
                this.resources.currentTask.subscribe(obs);
                break;
            default:
                throw Error(`hmmm, couldn't find that resource: ${desired_resource}`);
        }

    }

    /*
     * Unsubscribes the 'obs' from the 'subbed_resource'.
     */
    unsubscribeFrom(obs, subbed_resource) {

        switch (subbed_resource) {
            case "title_key_list":
                this.resources.titleKeyList.unsubscribe(obs);
                break;
            case "current_task":
                this.resources.currentTask.unsubscribe(obs);
                break;
            default:
                throw Error(`you tried to access ${subbed_resource}, which doesn't exist`);
        }

    }

    /*
     * This is the function that updates tasks based on the final state of the tab....
     */
    registerFinalState(componentName, finalState, key) {
        // Filter for the task that got changed by matching 'key's.
        //console.log("in registerFinalState");
        this.resources.taskList.forEach((obsTask) => {
            const task = obsTask.getData();
            // if the task matches...
            if (task.key === key) {
                // find the tab to update...
                var foundIt = false;
                task.tabs.forEach((tab) => {
                    // console.log("HERHEEHRHE");
                    if (tab.title === componentName) {
                        tab.info = finalState;
                        // mark that we found the tab we were looking for
                        foundIt = true;
                    }
                });
                // handle the case where we don't find it
                if (!foundIt) {
                    // tab probably just got deleted...
                    // otherwise update that task's data
                } else {
                    obsTask.updateData(task);
                }
            }
        });
    }

    /*
     * Update the current task, it gets called by the TaskList's task_key items, it changes
     * currentTask's value to be that of the task with the 'key' passed in to it.
     */
    updateCurrentTask(key) {
        // console.log("updating current task with key", key);
        // this should never be size greater than 1...
        const newCurrentTask = this.resources.taskList.filter(taskObs =>
            taskObs.getData().key === key)[0];
        // console.log("retrieved new current task", newCurrentTask.getData());
        // const data = newCurrentTask.getData();
        if (newCurrentTask !== null) {
            this.resources.currentTask.updateData(newCurrentTask.getData());
            // console.log("finishes update");
        } else {
            // this shouldn't ever happen...
            throw Error("model.updateCurrentTask() was called with a null task...");
        }
    }

    /*
     * Update the contents of the task (it finds it by key)
     *
     * It just replaces whatever was there, so be careful that you
     * pass in all the task data, not just the thing you want to change.
     */
    updateTask(newTaskData) {
        // console.log("updating task!");
        this.resources.updateTask(newTaskData);
        this.resources.refreshTitleKeyList();
    }

    /*
     * Initialize a new tab for the task with the given 'key'
     */
    addTabToTask(key, tabTitle) {
        const task = this.resources.getTask(key);

        var newTab = {title: tabTitle};

        // figure out initial state...
        switch(tabTitle) {
            case ("analytics"):
                newTab.info = getInitialState("analytics");
                break;
            case ("calendar"):
                newTab.info = getInitialState("calendar");
                break;
            case("journal"):
                newTab.info = getInitialState("journal");
                break;
            default:
                throw new Error(`I don't know how to init the ${tabTitle} tab... `);
        }
        task.tabs.push(newTab);
        this.resources.updateTask(task);
        // console.log("post push tablist", this.resources);
    }

    /*
     * Remove a tab from the task with the given 'key'
     */
    removeTabFromTask(key, tabTitle) {
        const task = this.resources.getTask(key);

        task.tabs = task.tabs.filter(tab => tab.title != tabTitle);

        this.resources.updateTask(task);
    }

    /*
     * Create a new task
     * 'title' is the title of the new task.
     * returns - 'true' if it added, 'false' if it was a duplicate.
     */
    createTask(title) {
        // look for duplicate titles
        const duplicateTitles = this.resources.titleKeyList.getData().filter(titleKeyPair => titleKeyPair.title === title);

        if (duplicateTitles.length > 0) {
            // there was a duplicate, handle it! (meaning make the alert in the outer component)
            return false;
        } else {
            // find the key for the new task
            const maxKey = this.findMaxKey(this.resources.titleKeyList.getData());

            // However we decide to init tasks
            const temp = {title: title, description: "How does one describe something so beautiful as a task?", key: maxKey + 1, tabs: [{title: "edit", info: []}]};

            // add the task
            this.resources.addTask(temp);

            // update the taskkey list
            this.resources.refreshTitleKeyList();
            // console.log("here's total number of tasks", this.resources.taskList.length);
            // this.updateCurrentTask(this.resources.taskList.length);
            return true
        }
    }

    /*
     * Deletes the selected task, a deleted task cannot be recovered(!)
     */
    deleteTask(key) {
        this.resources.removeTask(key);
        this.resources.refreshTitleKeyList();
        // the task we were just in is gone, so reset current task to the home task
        const initTask = new InitialTask();
        this.resources.currentTask.updateData(initTask);
    }

    findMaxKey(titleKeyList) {
        const reducer = (sofar, newTK) => {
            const newKey = newTK.key;
            if (newKey > sofar) {
                return newKey;
            } else {
                return sofar;
            }
        };
        return titleKeyList.reduce(reducer, 0);
    }
}

export default Model;
