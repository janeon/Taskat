const Store = window.require('electron-store')

/*
 * Really just a wrapper for electron-store's methods.  
 */
export default class PersistentData {

    constructor() {
        this.store = new Store();

        this.read = this.read.bind(this);
        this.write = this.write.bind(this);
    }

    /*
     * Get the previous state...or an empty array...
     */
    read() {
        return this.store.get('taskList', []);
    }

    /*
     * This function takes the unwrapped task list...
     */
    write(taskList) {
        this.store.set('taskList', taskList);
    }

    /*
     * Burn it all.  
     */
    clear() {
        this.store.clear();
    }
}