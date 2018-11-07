/* This is a crude implementation of the observer pattern. 
 *
 * Objects can 'subscribe' to the data, and are notified (through calls to their 'onChange' method)
 * of any updates to the data. 
 * 
 * In this application the TaskList will subscribe to the list of task titles as well as the current task 
 * (in case it needs to color it), and the TaskDisplay will subscribe to the 'currentTask.tabs' property, and pass
 * the relevant data into whichever task is loaded.  
 */

class ObservableData {

    constructor() {
        this.data = null;
        // 'subscribers' the objects that want to know about changes to that data
        this.subscribers = [];

        this.getData = this.getData.bind(this);
    }

    // Add the 'observer' to the subscriber list
    subscribe(observer) {
        if (typeof(observer.onChange) == "function") {
            this.subscribers.push(observer);
            observer.onChange(this.copyData());
        } else {
            // This string template ${thing} isn't working like I think it does...
            throw TypeError("{observer.toString()} doesn't implement 'onChange() method...'");
        }
    }

    // Remove the 'observer' from the subscriber list
    unsubscribe(observer) {
        this.subscribers = this.subscribers.filter((value) => {
            return value !== observer;
        });
    }

    // this returns a shallow copy of the original data
    getData() {
        return this.copyData();
    }
    copyData() {
        if (this.data === null) {
            throw Error("Data has not been set yet");
        } else {
            if (this.data === 'object') {
                return Object.assign({}, this.data);    
            } else {
                return this.data;
            }
        }
    }

    // This is the only function that should ever actually change data
    updateData(newData) {
        this.data = newData;
        this.subscribers.forEach((obs) => obs.onChange(this.copyData()));
    }
}

export default ObservableData;