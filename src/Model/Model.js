import Resources from './Resources';

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
        // TODO -> read from DB on construction
        
        // Load some testing data in lieu of loading from DB
        if (testing) {
            this.resources = new Resources(initTaskList);
        } else {
            this.resources = new Resources([]);
        }
        // Lol you better be testing because otherwise resources is always empty...

        // binding the 'this' of that function to be the Model reference. 
        this.registerFinalState = this.registerFinalState.bind(this);
    }

    // TODO -> Destructor (save changes to the file)

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
        this.resources.taskList.forEach((obsTask) => {
            const task = obsTask.getData();
            // if the task matches...
            if (task.key === key) {
                // find the tab to update...
                var foundIt = false;
                task.tabs.forEach((tab) => {
                    if (tab.title === componentName) {
                        tab.info = finalState;
                        // mark that we found the tab we were looking for
                        foundIt = true;
                    }
                });
                // handle the case where we don't find it
                if (!foundIt) {
                    throw Error(
                        `You tried to update a component that isn't associated with that task: \n\tcom -> ${componentName}\n\ttask -> ${task})`
                    );
                // otherwise update that task's data
                } else {
                    obsTask.updateData(task);
                }
            }
        });
    }

    /*
     * Update the current task, it gets called by the TaskList's task_key items.  
     */
    updateCurrentTask(key) {
        // this should never be size greater than 1...
        const newCurrentTask = this.resources.taskList.filter(taskObs =>
            taskObs.getData().key === key)[0];
            
        if (newCurrentTask !== null) {
            this.resources.currentTask.updateData(newCurrentTask.getData());
        } else {
            throw Error("model.updateCurrentTask() was called with a null task...");
        }
    }
}

export default Model;