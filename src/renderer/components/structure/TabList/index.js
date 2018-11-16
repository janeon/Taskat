import React, { Component } from 'react';
import View from "./View";

/*
 * This component renders the list of tabs for the 'current_task'.
 */
class TabList extends Component {

    constructor(props) {
        super(props);
        this.tabList = props.tabList;
        this.onTabClick = props.onTabClick;
    }

    /*
     * A lifecycle method that tracks updates to 'props'
     * (necessary because constructor is only called once)
     */
    componentWillReceiveProps(newProps) {
        this.tabList = newProps.tabList;
        this.onTabClick = newProps.onTabClick;
    }

    render() {

        // This is the list that appears in the drop down...
        const tabOptions = ["spaghetti"];

        // convert list of tabs to html elements
        const tabElementList = this.tabList.map((title, index) => {
            // this will (eventually) bind the function for displaying the tab as a callback to the model.
            return <div className="tab" 
                        key={index}
                        onClick={(e) => this.onTabClick(title)}>
                            {title}
                    </div>;
        });

        return <View tabElementList={tabElementList}/>;
    }

}

export default TabList;
