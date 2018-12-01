import React, { Component } from 'react';
import View from './View';
import { InitialTask } from '../../../utilities/general_content';

var map = {49: false, // 1
           50: false, // 2
           51: false, // 3
           52: false, // 4
           17: false, // left ctrl
           91: false, // left command
           93: false, // right command
           37: false, // left arrow
           39: false, // right arrow
           18: false, // right option
           65: false,
           87: false,
           83: false,
           68: false};

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

        // this.state.tabListToDisplay = task.tabListToDisplay;
        // console.log("What's the current task like?", this.state.tabListToDisplay);
        this.onSwitchTab = this.onSwitchTab.bind(this);
        this.onDeleteTab = this.onDeleteTab.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
    }

    componentDidMount() {
        // subscribe to the "current_task"
        this.model.subscribeTo(this, "current_task");
        document.addEventListener("keydown", this.handleKeyDown, false);
        document.addEventListener("keyup", this.handleKeyUp, false);
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
     * 'tabTitle' - a string that is the title of the clicked tab.
     */
    onSwitchTab(tabTitle) {
        this.setState((state) => {
            state.currentTabTitle = tabTitle;
            return state;
        })
    }

    toggleTab(direction) {
        // console.log("current tab", this.state.currentTask);
        var currTabs = this.state.currentTask.tabs;
        // console.log("current tabs", currTabs);
        var elementPos = currTabs.findIndex(tab => tab.title === this.state.currentTabTitle)
        // console.log("current tab index", elementPos);
        // console.log("want to tab this way", direction);
        var length = currTabs.length;
        // console.log("which lands in this tab index", ((elementPos+direction % length) + length) % length)
        // var newIndex = ((elementPos+direction % length) + length) % length;
        // console.log("which has this title", currTabs[((elementPos+direction % length) + length) % length].title);
        this.onSwitchTab(currTabs[((elementPos+direction % length) + length) % length].title)
    }

    handleKeyDown(e) {
      var pressed = e.keyCode;
      var count = 0; var code = 0;
      for (var key in map) {
        if (map[key]) {
          count++;
          if (key >= 49 && key <= 52)
            code = key;
        }
      }
      if (pressed === 37 && map[93] && map[18]) this.toggleTab(-1);
      if (pressed === 39 && map[93] && map[18]) this.toggleTab(1);
      if (code !== 0 && count === 2) map[code] = false;

      if (e.keyCode in map) {
          map[e.keyCode] = true;
          if ((map[93] && map[49]) || (map[91] && map[49])){
              // console.log('first tab');
              this.onSwitchTab(this.state.currentTask.tabs[0].title);
          }
          if ((map[93] && map[50]) || (map[91] && map[50])){
              // console.log('second tab');
              this.onSwitchTab(this.state.currentTask.tabs[1].title);
          }
          if ((map[93] && map[51]) || (map[91] && map[51])){
              // console.log('third tab');
              this.onSwitchTab(this.state.currentTask.tabs[2].title);
          }
          if ((map[93] && map[52]) || (map[91] && map[52])){
              // console.log('fourth tab');
              this.onSwitchTab(this.state.currentTask.tabs[3].title);
          }
        }
      }

      handleKeyUp(e) {
        // console.log("keyup", e.keyCode);
        if (e.keyCode in map) {
            map[e.keyCode] = false;
            if (e.keyCode === 91 || e.keyCode === 93) {
              for (var key in map)
                map[key] = false;
            }
          }
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
      // Should keep deleted tabs on file somewhere

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

        // decide whether or not this needs to load the NewTabButton...
        const displayNewTabButton = (this.state.currentTabTitle != "welcome tab");

        return < View
                    // TabList ...
                    tabList={tabList}
                    currentTaskTabList={this.state.currentTask.tabs}
                    onDeleteTab={this.onDeleteTab}
                    addTabToTask={this.model.addTabToTask}
                    displayNewTabButton={displayNewTabButton}
                    // TabList is going to wrap this onSwitchTab with the appropriate args.
                    onSwitchTab={this.onSwitchTab}

                    // TabDisplay
                    tabToDisplay={this.state.currentTabTitle}
                    tabInfo={tabInfo}
                    registerFinalState={this.model.registerFinalState}
                    currentTask={this.state.currentTask}
                    model={this.model}

                    deleteTaskOnClick={this.model.deleteTask}

                    // both
                    taskKey={this.state.currentTask.key}
                    />;

    }

}

export default TaskDisplay;
