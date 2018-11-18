import React, { Component } from 'react';
import View from "./View";
import { ALL_TABS } from "../../../utilities/constants";

/*
 * This component renders the list of tabs for the 'current_task'.
 */
class TabList extends Component {

    constructor(props) {
        super(props);
        this.tabList = props.tabList;
        this.onTabClick = props.onTabClick;
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
        this.onTabClick = newProps.onTabClick;
        this.displayNewTabButton = newProps.displayNewTabButton;
        // don't need to refresh addTabToTask method...
        this.taskKey = newProps.taskKey;
    }

    /*
     * Figure out which tabs aren't already available for the current task.
     */
    parseTabOptions(listOfTabs) {
        return ALL_TABS.filter(tab => ! listOfTabs.includes(tab));
    }

    render() {

        const newTabButtonTabs = this.parseTabOptions(this.tabList);

        if (newTabButtonTabs.length === 0) {
            this.displayNewTabButton = false;
        }

        // convert list of tabs to html elements
        const tabElementList = this.tabList.map((title, index) => {
            // this will (eventually) bind the function for displaying the tab as a callback to the model.
            return <div className="tab" 
                        key={index}
                        onClick={(e) => this.onTabClick(title)}>
                            {title}
                    </div>;
        });

        return <View tabElementList={tabElementList} 
                    newTabButtonTabs={newTabButtonTabs} 
                    displayNewTabButton={this.displayNewTabButton}
                    addTabToTask={this.addTabToTask}
                    taskKey={this.taskKey}/>;
    }

}

export default TabList;
