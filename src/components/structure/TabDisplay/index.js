import React, { Component } from 'react';
import View from './View';
// import Calendar from '../../tabs/Calendar';

class TabDisplay extends Component {

    constructor(props) {
        super(props);

        this.tabInfo = props.tabInfo;
        this.tabToDisplay = props.tabToDisplay;
        this.registerFinalStateFunc = props.registerFinalStateFunc;
        // console.log("TabDisplay's prop function", props.registerFinalState); // testing funtion in tabdisplay
        // this is being passed the registerFinalState function, it just isn't passing it yet.
    }

    /*
     * See TabList for explanation of this method
     */
    componentWillReceiveProps(newProps) {
        this.tabInfo = newProps.tabInfo;
        this.tabToDisplay = newProps.tabToDisplay;
        this.registerFinalStateFunc = newProps.registerFinalStateFunc;

    }

    render() {
        return <View
          registerFinalState={this.registerFinalStateFunc}
          tabToDisplay={this.tabToDisplay} 
          />;
    }
}

export default TabDisplay;
