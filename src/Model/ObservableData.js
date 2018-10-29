/* This is a crude implementation of the observer pattern. 
 *
 * Objects can 'subscribe' to the data, and are notified (through calls to their 'onChange' method)
 * of any updates to the data. 
 * 
 * In this application the TaskList will subscribe to the list of task titles as well as the current task,  
 * and the TaskDisplay will subscribe to the 'currentTask.tabs' property.  
 */
class ObservableData {

    constructor() {
        // 'data' - the currently selected task
        this.data = null;
        // 'subscribers' the objects that want to know about changes to that data
        this.subscribers = [];
    }

    subscribe(observer) {
        if (typeof(observer.onChange) == "function") {
            this.subscribers.push(observer);
            observer.onChange(this.data);
        } else {
            // This string template ${thing} isn't working like I think it does...
            throw TypeError("${observer} doesn't implement 'onChange() method...'");
        }
    }

    unsubscribe(observer) {
        this.subscribers = this.subscribers.filter((value) => {
            return value !== observer;
        });
        console.log("unsubscribing" + observer);
    }

    updateData(newData) {
        this.data = newData;
        this.subscribers.forEach((obs) => obs.onChange(newData));
    }
}

export default ObservableData;