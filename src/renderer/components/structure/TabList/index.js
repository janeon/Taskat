import React, { Component } from 'react';
import View from "./View";
import 'font-awesome/css/font-awesome.min.css';
import { ALL_TABS } from "../../../utilities/constants";

/*
 * This component renders the list of tabs for the 'current_task'.
 */
class TabList extends Component {
/*
Goals:
- save last tab
-
-
*/
    constructor(props) {
        super(props);
        this.tabList = props.tabList;
        this.onSwitchTab = props.onSwitchTab;
        this.tabToDisplay = props.tabToDisplay;
        this.onDeleteTab = props.onDeleteTab;
        // this.onTabClick = props.onTabClick;
        this.displayNewTabButton = props.displayNewTabButton;
        this.addTabToTask = props.addTabToTask;
        this.taskKey = props.taskKey;
        this.currentTabTitle = props.currentTabTitle
        this.addTabToTaskandSwitch = this.addTabToTaskandSwitch.bind(this);
    }

    /*
     * A lifecycle method that tracks updates to 'props'
     * (necessary because constructor is only called once)
     */
    componentWillReceiveProps(newProps) {
        this.tabList = newProps.tabList;
        this.onSwitchTab = newProps.onSwitchTab;
        this.tabToDisplay = newProps.tabToDisplay;
        this.onDeleteTab = newProps.onDeleteTab;
        this.displayNewTabButton = newProps.displayNewTabButton;
        this.currentTabTitle = newProps.currentTabTitle;
        // don't need to refresh addTabToTask method...
        this.taskKey = newProps.taskKey;
    }

    /*
     * Figure out which tabs aren't already available for the current task.
     */
    parseTabOptions(listOfTabs) {
        return ALL_TABS.filter(tab => ! listOfTabs.includes(tab));
    }

    addTabToTaskandSwitch(key, tabTitle) {
      this.addTabToTask(key, tabTitle);
      console.log("adding and swtiching", this.currentTabTitle);
      this.onSwitchTab(tabTitle)
    }

    render() {
        const newTabButtonTabs = this.parseTabOptions(this.tabList);
        if (newTabButtonTabs.length === 0) {
            this.displayNewTabButton = false;
        }

        // convert list of tabs to html elements
        var tabElementList = this.tabList.map((title, index) => {
          var ret =
                      <div key={index}>
                        <div className={(this.tabList.indexOf(this.tabToDisplay) === index) ? "currentTab" : "tab"} onClick={(e) => this.onSwitchTab(title)}>{title}</div>
                          <div className="delete" onClick={(event) => this.onDeleteTab(title)}>
                            <i className="fa fa-times"></i>
                          </div>
                      </div>
            ;
        return ret;
      });
        return <View tabElementList={tabElementList}
                    newTabButtonTabs={newTabButtonTabs}
                    displayNewTabButton={this.displayNewTabButton}
                    addTabToTask={this.addTabToTaskandSwitch}
                    taskKey={this.taskKey}/>;
    }

}

export default TabList;
