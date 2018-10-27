// This is a crude implementation of the observer pattern. 
class CurrentTask {

    constructor() {
        this.data = null;
        this.subscribers = [];
    }

    subscribe(observer) {
        if (typeof(observer.onChange()) == "function") {
            this.subscribers.add(observer);
        } else {
            throw TypeError("${observer} doesn't implement 'onChange() method...'");
        }
    }

    unsubscribe(observer) {
        const indexOfObs = this.subscribers.indexOf(observer);
        if (indexOfObs != -1) {
            delete this.subscribers[indexOfObs];
        } else {
            // throw the appropriate error
        }
    }

    updateTask(newTask) {
        this.data = newTask;
        this.subscribers.apply((obs) => obs.onChange(newTask));
    }
}

export default CurrentTask;