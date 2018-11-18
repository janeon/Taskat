import React, { Component } from 'react';
import View from "./View";
import 'font-awesome/css/font-awesome.min.css';
import { ALL_TABS } from "../../../utilities/constants";

/*
 * This component renders the list of tabs for the 'current_task'.
 */
class TabList extends Component {

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
    }

    /*
     * A lifecycle method that tracks updates to 'props'
     * (necessary because constructor is only called once)
     */
    componentWillReceiveProps(newProps) {
        this.tabList = newProps.tabList;
// <<<<<<< HEAD
        this.onSwitchTab = newProps.onSwitchTab;
        this.tabToDisplay = newProps.tabToDisplay;
        this.onDeleteTab = newProps.onDeleteTab;
// =======
        // this.onTabClick = newProps.onTabClick;
        this.displayNewTabButton = newProps.displayNewTabButton;
        // don't need to refresh addTabToTask method...
        this.taskKey = newProps.taskKey;
    }

    /*
     * Figure out which tabs aren't already available for the current task.
     */
    parseTabOptions(listOfTabs) {
        return ALL_TABS.filter(tab => ! listOfTabs.includes(tab));
// >>>>>>> baaadca39c86c7d411f4853ea0037751b117c838
    }

    // onDeleteTab(tabTitle) {
    //   console.log("deleting");
    //   // console.log("length current task tablist", this.props.currentTaskTabList.length);
    //   const targetIndex = this.props.currentTaskTabList.findIndex( tab => tab.title === tabTitle );
    //   // below two lines actually removes tab from array, but what we want it some way to hide it
    //   // if (this.props.currentTaskTabList.length > 1)
    //   //   this.props.currentTaskTabList.splice(targetIndex, 1);
    //   // console.log();
    //   if (tabTitle === "welcome tab"){
    //     console.log("analyzing");
    //   }
    //   var newCurrentTab = this.props.currentTaskTabList.find( tab => tab.title === "welcome tab");
    //   if (this.props.currentTaskTabList.length < 2)
    //    newCurrentTab = this.props.currentTaskTabList.find( tab => tab.title !== tabTitle)
    //   this.onSwitchTab(newCurrentTab);
    //   console.log("new tab to display", this.props.tabToDisplay);
    //   // console.log("current tab list", this.props.tabToDisplay);
    // }

    render() {

        const newTabButtonTabs = this.parseTabOptions(this.tabList);

        if (newTabButtonTabs.length === 0) {
            this.displayNewTabButton = false;
        }

        // convert list of tabs to html elements
        var tabElementList = this.tabList.map((title, index) => {
            // this will (eventually) bind the function for displaying the tab as a callback to the model.
            return <div className="tab"
                        key={index}>
                        <div onClick={(e) => this.onSwitchTab(title)}>{title}</div>
                        <div className="delete" onClick={(event) => this.onDeleteTab(title)}>
                          <i className="fa fa-times"></i>
                        </div>
                    </div>
        });

        return <View tabElementList={tabElementList}
                    newTabButtonTabs={newTabButtonTabs}
                    displayNewTabButton={this.displayNewTabButton}
                    addTabToTask={this.addTabToTask}
                    taskKey={this.taskKey}/>;
    }

}

export default TabList;
