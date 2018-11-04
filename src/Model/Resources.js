import ObservableData from './ObservableData';
import { InitialTask } from '../Utilities/GeneralContent';
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
    }

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
 }