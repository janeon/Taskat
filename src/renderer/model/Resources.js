import ObservableData from './ObservableData';
import { InitialTask } from '../utilities/general_content';
/*
 * This is where the data is parsed and stored throughout its life.  It only ever returns 
 * copies of what it is holding, not actual references to their values.    
 */
 export default class Resources {
     // Initializing the things we will want to track
    constructor(allTasks) {

        // Each task is wrapped in an ObservableData object...
        this.taskList = allTasks.map((task, index) => {
            const obs = new ObservableData();
            task.key = index;
            obs.updateData(task)
            return obs;
        });
        this.titleKeyList = new ObservableData();
        this.currentTask = new ObservableData();

        this.currentTask.updateData(new InitialTask());
        this.titleKeyList.updateData(this.parseTasksToTitles());

        this.parseTasksToTitles = this.parseTasksToTitles.bind(this);
    }

    /*
     * Parse the taskList into title-key pairs
     */
    parseTasksToTitles() {
        return (
            this.taskList.map((obsTask) => {
                const task = obsTask.getData()
                return { 
                        title: task.title,
                        key: task.key,
                }
            })
        );
    }

    /*
     * Make sure that the titlekeyList is still accurate (in case we change 
     * the title of a task for instance)
     */
    refreshTitleKeyList() {
        const currentStateOfList = this.parseTasksToTitles();
        if (currentStateOfList !== this.titleKeyList.getData()) {
            this.titleKeyList.updateData(currentStateOfList);
        } 
        // it they are the same, then nothing needs to happen :)
    }

    /*
     * Add a new task
     */
    addTask(newTask) {
        const obsWrapper = new ObservableData();
        obsWrapper.updateData(newTask);
        this.taskList.push(obsWrapper);
    }

    /*
     * Remove a task (with the matching key)
     */
    removeTask(keyOfTaskToRemove) {
        this.taskList = this.taskList.filter(taskObs => taskObs.getData().key !== keyOfTaskToRemove);
    }

    getUnwrappedTaskList() {
        return this.taskList.map(taskObs => taskObs.getData());
    }
 }