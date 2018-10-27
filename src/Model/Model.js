/*
 * This tracks state changes. 
 */ 

import CurrentTask from './CurrentTask';

class Model {

    constructor() {
        this.currentTask = new CurrentTask();
    }

    // returns all the tasks that exist. 
    getAllTasks() {
        // dummy data for testing purposes
        return [
            {key: 0, title: "do 10 jumping jacks", tabs: {analytics: "jj analytics", journal: "jj journal"}},
            {key: 1, title: "go to sleep", tabs: {analytics: "sleep data"}},
        ];
    }
    // addTask();
    // removeTask();
}

export default Model;