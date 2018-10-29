/*
 * This component is all about the tab list.
 */
import React, { Component } from 'react';
import View from "./View";

class TabList extends Component {

    render() {
        // should convert list of tabs to html elements
        const tabList = [{text: "today", key: 1}, {text: "calendar", key: 2}, {text: "analystics", key: 3},{text: "menu", key: 4}];
        const tabElementList = tabList.map((el) => {
            // this will (eventually) bind the function for displaying the tab as a callback to the model.
            return <div className="tab" key={el.key}>{el.text}</div>;
        });

        return <View tabElementList={tabElementList}/>;
    }

}

export default TabList;
