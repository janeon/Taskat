/*
 * These are large definitions that are reused throughout the application.
 */

/*
 * This is the task that is loaded when the app first opens, possibly it could be expanded into a sort of home screen, 
 * kind of like what we used to call the "today" view.   
 */
export class InitialTask {
    constructor() {
        this.title = "initialTask";
        this.tabs = [ {title: "welcome tab", info: {welcomeMessage: "Welcome, select a task, or create a new one :) "}}];
        this.key = -1;
    }
}