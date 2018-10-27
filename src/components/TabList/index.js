/*
 * This component is all about the tab list.  
 */
import React, { Component } from 'react';
import View from "./View";

class TabList extends Component {

    constructor(props) {
        super(props);

        
    }

    render() {
        // should convert list of tabs to html elements 
        const tabList = [{text: "finish the pizza", key: 1}, {text: "smell good", key: 2}];
        const tabElementList = tabList.map((el) => {
            // this will (eventually) bind the function for displaying the tab as a callback to the model.  
            return <div className="tab" key={el.key}>{el.text}</div>;
        });
        return <View tabElementList={tabElementList}/>;
    }

}

export default TabList;