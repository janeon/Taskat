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
                        label: 'My data!',
                        data: [],
                        fill: false,
                        lineTension: 0.1
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
