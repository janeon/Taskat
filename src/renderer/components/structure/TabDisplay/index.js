import React, { Component } from 'react';
import View from './View';

import Analytics from '../../tabs/Analytics';
import Calendar from '../../tabs/Calendar';
import Journal from '../../tabs/Journal';

class TabDisplay extends Component {

    constructor(props) {
        super(props);
        
        this.tabInfo = props.tabInfo;

        this.tabToDisplay = props.tabToDisplay;
        this.registerFinalStateFunc = props.registerFinalStateFunc;
        // this is being passed the registerFinalState function, it just isn't passing it yet.
        this.taskKey = props.taskKey; 

        //THIS IS NOT USUALLY PASSED TO A TASK!!
        this.deleteTaskOnClick = props.deleteTaskOnClick;
    }

    /*
     * See TabList for explanation of this method
     */
    componentWillReceiveProps(newProps) {
        this.tabInfo = newProps.tabInfo;
        this.tabToDisplay = newProps.tabToDisplay;
        this.registerFinalStateFunc = newProps.registerFinalStateFunc;
        this.taskKey = newProps.taskKey;

    }

    render() {
        // TODO -> parse tabToDisplay and tabInfo to decide what to render...
        switch(this.tabToDisplay) {
            case "analytics":
                return <Analytics />;
            case "calendar":
                return <Calendar />;
            case "journal":
                return <Journal />;
            case "menu": 
                console.log("display menu");
                break;
            case "welcome tab":
                //console.log("display welcome tab");
                break;
            default: 
                console.log(`TabDisplay parser didn't recognize ${this.tabToDisplay}`);
                break;
        }
        return <View taskKey={this.taskKey} deleteTaskOnClick={this.deleteTaskOnClick}/>;
    }

}

export default TabDisplay;