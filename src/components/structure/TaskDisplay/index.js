import React, { Component } from 'react';
import View from './View';
import { InitialTask } from '../../../utilities/general_content';

<<<<<<< HEAD
=======
/*
 * parses the 'currentTask' into its tablist and tabdisplay.  
 */
>>>>>>> 817f2fa32a52139491b7855e4b7fed4cc0fc200c
class TaskDisplay extends Component {
    constructor(props) {
        super(props);

        // This is the farthest down the tree the Model itself needs to go...
        this.model = props.model;

        this.state = {
            // what to do here is up in the air, maybe the 'menu' tab?
            currentTask: new InitialTask(),
            currentTabTitle: "welcome tab",
        };

        // binding 'this' in onTabClick()
        this.onTabClick = this.onTabClick.bind(this);
    }

    componentDidMount() {
        // subscribe to the "current_task"
        this.model.subscribeTo(this, "current_task");
    }

    componentWillUnmount() {
        this.model.unsubscribeFrom(this, "current_task");
    }

    onChange(newCurrentTask) {
        this.setState((state) => {
            state.currentTask = newCurrentTask;
            // TODO -> decide which tab should be opened when task is rendered :)
            state.currentTabTitle = newCurrentTask.tabs[0].title;
            return state;
        });
    }

    /*
     * Clicks to tabList should cause a different tab to be loaded...
<<<<<<< HEAD
     *
     * 'tabClicked' - a string that is the title of the clicked tab.
=======
     * 
     * 'tabClicked' - a string that is the title of the clicked tab. 
>>>>>>> 817f2fa32a52139491b7855e4b7fed4cc0fc200c
     */
    onTabClick(tabTitle) {
        this.setState((state) => {
            state.currentTabTitle = tabTitle;
            return state;
        })
    }

    /*
     * Separates the tabs from the current_task into 'title' 'key' pairs.
     */
    getTabList(task) {
        return task.tabs.map( tab => {
            return tab.title;
        });
    }

    /*
     * Strips the info from the current task for the current tab.
     */
    getTabInfo(task, tabTitle) {
        return task.tabs.filter( tab => tab.title === tabTitle)[0].info;
    }

    render() {
        const tabList = this.getTabList(this.state.currentTask);

        const tabInfo = this.getTabInfo(this.state.currentTask, this.state.currentTabTitle);

        return < View
                    tabList={tabList}
                    // TabList is going to wrap this onClick with the appropriate args.
                    onTabClick={this.onTabClick}
<<<<<<< HEAD
                    tabToDisplay={this.state.currentTabTitle}
                    tabInfo={tabInfo}
=======
                    tabToDisplay={this.state.currentTabTitle} 
                    tabInfo={tabInfo} 
>>>>>>> 817f2fa32a52139491b7855e4b7fed4cc0fc200c
                    registerFinalState={this.model.registerFinalState} />;
    }

}

export default TaskDisplay;
