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
          deleteTaskOnClick : props.deleteTaskOnClick,
          currentTask : props.currentTask,
          model : props.model
        };
    }

    /*
     * See TabList for explanation of this method
     */
    componentWillReceiveProps(newProps) {
        this.state.tabInfo = newProps.tabInfo;
        this.state.tabToDisplay = newProps.tabToDisplay;
        this.state.registerFinalState = newProps.registerFinalState;
        this.state.taskKey = newProps.taskKey;
        this.state.model = newProps.model;
        this.state.currentTask = newProps.currentTask;
    }

      render() {
          return <View
            registerFinalState={this.state.registerFinalState}
            tabToDisplay={this.state.tabToDisplay}
            tabInfo={this.state.tabInfo}
            taskKey={this.state.taskKey}
            currentTask={this.state.currentTask}
            model={this.state.model}
            />;
      }
}

export default TabDisplay;
