/*
 * This tracks state changes. 
 */ 

import ObservableData from './ObservableData';
// just for testing :)
import { getTestTaskListSmall } from '../TestResources/testutils'

/*
 * This the single source of data for the app.
 *
 * Any components that need information can subscribe to the datasource that they need (and they 
 * will be updated (through their 'onChange()' method) when that data is altered).
 * 
 * I am thinking that any alterations to the data also occur through this class.  
 */
class Model {

    constructor() {
        this.currentTask = new ObservableData();
        // 'allTasks' - holds the task objects (title, key, {tabs})
        this.allTasks = new ObservableData();

        // TODO -> read from DB on initial load  
        // THIS IS TEMPORARY
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

    /*
     * This is the function that applies changes to the data. 
     *
     * all 'action' is an object with {code: 'what_to_do', args: {   } }.   
     */
    applyChange(action) {
        //remove task
        //add task 
        //task completed
        //edit task (meaning edit tabs)
    }
}

export default Model;

/*
 *  Maybe the components should only recieve the necessary subscribe function, as opposed to the entire model? 
 *
 *  Would it be cleaner to parse the general task[] in the model itself (as various OD's), or have the components just clean 
 * up whatever they need? 
 */  

/*
 * ALTERNATIVE DESIGN: as things are constructed, they are added (similar to the subscriber approach) into an array,
 * that lives inside the model, and button clicks / interactions correspond to various actions that the model coordinates 
 * entirely (components are just conduits, they no longer contain logic).
 * 
 * -- or maybe this is just how clicks should be handled?  YES THIS
 * 
 * Maybe something more functional in design? - but I don't really want to pass state all over the place...
 */