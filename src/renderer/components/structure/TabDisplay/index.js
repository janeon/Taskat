import React, { Component } from 'react';
import View from './View';

class TabDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tabInfo:props.tabInfo,
          tabToDisplay:props.tabToDisplay,
          registerFinalState:props.registerFinalState,
          // this is being passed the registerFinalState function, it just isn't passing it yet.
          taskKey:props.taskKey,
          //THIS IS NOT USUALLY PASSED TO A TASK!!
          deleteTaskOnClick : props.deleteTaskOnClick
        };
        // this.state.tabInfo = props.tabInfo;
        // this.state.tabToDisplay = props.tabToDisplay;
        // this.state.registerFinalStateFunc = props.registerFinalStateFunc;
        // this.state.taskKey = props.taskKey;
        //
        // //THIS IS NOT USUALLY PASSED TO A TASK!!
        // this.state.deleteTaskOnClick = props.deleteTaskOnClick;
    }

    /*
     * See TabList for explanation of this method
     */
    componentWillReceiveProps(newProps) {
        this.state.tabInfo = newProps.tabInfo;
        this.state.tabToDisplay = newProps.tabToDisplay;
        this.state.registerFinalStateFunc = newProps.registerFinalStateFunc;
        this.state.taskKey = newProps.taskKey;
    }

      render() {
          return <View
            registerFinalState={this.state.registerFinalStateFunc}
            tabToDisplay={this.state.tabToDisplay}
            />;
      }

}

export default TabDisplay;
