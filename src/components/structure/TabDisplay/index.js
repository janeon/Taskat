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
        // TODO -> parse tabinfo to decide what to render...
        switch(this.tabToDisplay) {
            case "analytics":
                console.log("display analytics");
                break;
            case "calendar":
                console.log("display calendar");
                break;
            case "journal":
                console.log("display journal");
                break;
            case "menu":
                console.log("display menu");
                break;
            case "welcome tab":
                console.log("display welcome tab");
                break;
            default:
                console.log(`TabDisplay parser didn't recognize ${this.tabToDisplay}`);
                break;
        }
        return <View
          registerFinalState={this.registerFinalStateFunc}/>;
    }

}

export default TabDisplay;
