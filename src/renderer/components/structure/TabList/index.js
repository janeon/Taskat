import React, { Component } from 'react';
import View from "./View";
import 'font-awesome/css/font-awesome.min.css';
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

        // this.onDeleteTab = props.onDeleteTab;
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

        return <View tabElementList={tabElementList}/>;
    }

}

export default TabList;
