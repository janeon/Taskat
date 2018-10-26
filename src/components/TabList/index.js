/*
 * This component is all about the tab list.  
 */
import React, { Component } from 'react';
import View from "./View";

class TabList extends Component {
    constructor(props) {
        super(props);

        // where we are going to revieve the actual tablist from.
    }

    render() {
        // should convert list of tabs to html elemnts 
        const tabList = [{text: "analytics", content: [1, 2, 3, 4]}, {text: "journal", content: "nailed it"}];
        const tabElementList = tabList.map((el) => {
            // this will (eventually) bind the function for displaying the tab as a callback to the model.  
            return <div className="tab">{el.text}</div>;
        });
        return <View tabElementList={tabElementList}/>;
    }

}

export default TabList;