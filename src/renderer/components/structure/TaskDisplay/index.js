import React, { Component } from 'react';
import View from './View';
import { InitialTask } from '../../../utilities/general_content';

class TaskDisplay extends Component {
    constructor(props) {
        super(props);

        // This is the farthest down the tree the Model itself needs to go...
        this.model = props.model;

        this.state = {
            // what to do here is up in the air, maybe the 'menu' tab?
            currentTask: new InitialTask(),
            currentTabTitle: "welcome tab",
            tabListToDisplay: [],
        };

        // binding 'this' in onSwitchTab()
        var task = this.state.currentTask;
        // this.state.tabListToDisplay = task.tabListToDisplay;
        console.log("What's the current task like?", this.state.tabListToDisplay);
        this.onSwitchTab = this.onSwitchTab.bind(this);
        this.onDeleteTab = this.onDeleteTab.bind(this);
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
     *
     * 'tabClicked' - a string that is the title of the clicked tab.
     */
    onSwitchTab(tabTitle) {
        this.setState((state) => {
            state.currentTabTitle = tabTitle;
            return state;
        })
    }

    onDeleteTab(tabTitle) {
      var tabList = this.state.currentTask.tabs;
      // console.log("The current list of tabs", tabList[0].title);
      const targetIndex = tabList.findIndex( tab => tab.title === tabTitle );
      const nextTabIndex = tabList.findIndex( tab => tab.title !== tabTitle );
      var newCurrentTabTitle; // if no other tabs are open, then keep the welcome tab up
      // otherwise display another tab (need to eventually find an open tab)
      // if (targetIndex !== 0) { // if we're not removing the first tab, we'll just display the first
      //   // console.log("current first tab", tabList[0].title);
      //   newCurrentTabTitle = tabList[0].title;
      // }
      const sure = window.confirm("Are you sure you want to delete " + tabTitle + "?");
      if (!sure) {
        newCurrentTabTitle = this.state.currentTabTitle;
      }
      else if (tabTitle === "menu") {
        newCurrentTabTitle = tabTitle;
      }
      else { // if we are displaying the first tab and list is greater than 1 tab, remove first and display second tab
        (targetIndex !== 0) ? newCurrentTabTitle = tabList[0].title : newCurrentTabTitle = tabList[nextTabIndex].title;
        tabList.splice(targetIndex, 1);
      }


      this.setState((state) => {
          this.state.currentTabTitle = newCurrentTabTitle;
          return state;
      })


      // Need to make sure the deleted tabs are kept on file somewhere
      // if (tabList.length > 1

    }

    /*
     * Separates the tabs from the current_task into 'title' 'key' pairs.
     */
    getTabList(task) {
      // console.log("tabs to display",task.tabs);
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
        var tabList = this.getTabList(this.state.currentTask);
        // could alternatively use removeTabFromTask from model
        // console.log("THIS IS THE tabList", tabList);
        // console.log("THIS IS THE currentTask", this.state.currentTask);
        var tabInfo = this.getTabInfo(this.state.currentTask, this.state.currentTabTitle);

        return < View
                    tabList={tabList}
                    // TabList is going to wrap this onClick with the appropriate args.
                    onSwitchTab={this.onSwitchTab}
                    tabToDisplay={this.state.currentTabTitle}
                    tabInfo={tabInfo}
                    registerFinalState={this.model.registerFinalState}
                    taskKey={this.state.currentTask.key}
                    deleteTaskOnClick={this.model.deleteTask}
                    currentTaskTabList={this.state.currentTask.tabs}
                    onDeleteTab={this.onDeleteTab}
                    />;
        const displayNewTabButton = (this.state.currentTabTitle != "welcome tab");

        return < View
                    // Tab list...
                    tabList={tabList}
                    displayNewTabButton={displayNewTabButton}
                    addTabToTask={this.model.addTabToTask}
                    // TabList is going to wrap this onClick with the appropriate args.
                    onSwitchTab={this.onSwitchTab}

                    // Tab Display....
                    tabToDisplay={this.state.currentTabTitle}
                    tabInfo={tabInfo}
                    registerFinalState={this.model.registerFinalState}
                    taskKey={this.state.currentTask.key}
                    deleteTaskOnClick={this.model.deleteTask}
                    />
    }

}

export default TaskDisplay;
