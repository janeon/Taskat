/*
 * This tracks state changes. 
 */ 

import ObservableData from './ObservableData';
// just for testing :)
import { getTestTaskListSmall } from '../TestResources/testutils'

/*
 * This is just a container for the currentTask and allTask objects.  
 */

class Model {

    constructor() {
        this.currentTask = new ObservableData();
        // 'allTasks' - holds the task objects (title, key, {tabs})
        this.allTasks = new ObservableData();
        // TODO -> read from DB on initial load  
        this.allTasks.updateData(getTestTaskListSmall());
    }

    // TODO -> Destructor (save changes to the file)

    // returns all the tasks that exist. 
    getAllTasks() {
        // return this.allTasks;
        // dummy data for testing purposes
        return this.allTasks.data;
    }
    // TODO -> maybe the TaskList should just subscribe, and circumvent this little thing? 

    getAllTaskTitles() {
        return this.allTasks.data.map((task) => {
            return task.title;
        });
    }
}

export default Model;

/*
 * The Model holds the single reference to the task list (and all of its values) and passes copies to whoever needs them, 
 * or updates values that need to be updated (and dispatches those changes).  
 */  