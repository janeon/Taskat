import React, { Component } from 'react';
import View from './View';
// import Calendar from '../../tabs/Calendar';

class TabDisplay extends Component {

    constructor(props) {
        super(props);

        // this.tabInfo = props.tabInfo;
        // this.tabToDisplay = props.tabToDisplay;
        // this.registerFinalStateFunc = props.registerFinalStateFunc;
        // console.log("TabDisplay's prop function", props.registerFinalState); // testing funtion in tabdisplay
        // this is being passed the registerFinalState function, it just isn't passing it yet.

        this.state = { tabToDisplay : props.tabToDisplay , tabInfo: props.tabInfo, registerFinalStateFunc: props.registerFinalStateFunc};
    }

    /*
     * See TabList for explanation of this method
     */
    componentWillReceiveProps(newProps) {
        // this.tabInfo = newProps.tabInfo;
        this.setState({ tabInfo: newProps.tabToDisplay });
        this.setState({ tabToDisplay: newProps.tabToDisplay });
        this.setState({ registerFinalStateFunc: newProps.registerFinalStateFunc });
        // this.tabToDisplay = newProps.tabToDisplay;
        // this.registerFinalStateFunc = newProps.registerFinalStateFunc;

    }

    render() {
      // console.log("tabToDisplay", this.state.tabToDisplay);
        return <View
          registerFinalState={this.state.registerFinalStateFunc}
          tabToDisplay={this.state.tabToDisplay}
          />;
    }
}

export default TabDisplay;
