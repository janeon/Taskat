/*
 * These are large definitions that are reused throughout the application.
 */

/*
 * This is the task that is loaded when the app first opens, possibly it could be expanded into a sort of home screen,
 * kind of like what we used to call the "today" view.
 */
export class InitialTask {
    constructor() {
        this.title = "Welcome!";
        this.description = "You havent made any tasks yet!. Here's how to use our app. on the upper left corner, type " + 
        "into the 'new task' field to create a task. The first view you'll then see is the name of your task and a default " +
        "description. You can change the name and description of the task in this view. To add analytics, journal entries, " +
        "and/or calendar events to that specific task, use the +Tab button. Have fun, and stay on task!";
        this.tabs = [ {title: "welcome tab", info: {welcomeMessage: "Welcome, select a task, or create a new one :) "}}];
        this.tabsToDisplay= this.tabs;
        this.key = -1;
    }
}


// Is this where all tabs' initial states should be catalogued?

// INITIAL STATES

export function getInitialState(tabTitle) {

    switch(tabTitle) {
        case ("analytics"):

            return {
                progress: 0,
                progTotal: 10,
                isNewTab: true,
                chartType: 'select',
                type: 'Line',
                xLabel: 'x-axis',
                yLabel: 'y-axis',
                date: null,
                dataValue: 0,
                labelValue: 'enter label',
                chartData : {
                    labels: [],
                    datasets: [
                    {
                        label: false,
                        data: [],
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(42,56,121,1)',
                        borderColor: 'rgba(42,56,121,1)',

                    }
                    ]
                }
              };
        case ("calendar"):
            return {
                events: [
                    {
                      end: new Date('November 11, 2018 20:00:00'),
                      start: new Date('November 11, 2018 06:00:00'),
                      title: 'Happy 11/11',
                      desc: 'Make a Wish!'
                    }
                ],
            };
        case ("journal"):
            return {
                value: 'type a journal entry',
                entries: []
            };
        default:
            alert("you can't get that initial state!");
            break;
    }
}
