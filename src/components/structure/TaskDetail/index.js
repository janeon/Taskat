import React, { Component } from 'react';
import View from './View';
import { InitialTask } from '../../Utilities/GeneralContent';

class TaskDetail extends Component {
    constructor(props) {
        super(props);

        // This is the farthest down the tree the Model itself needs to go...
        this.task = props.model;
    
        this.state = {
            currentTask: new InitialTask(),
            currentTabTitle: "welcome tab",
        };
    }

    componentDidMount() {
        // subscribe to the "current_task"
        this.model.subscribeTo(this, "current_task");
    }

    componentWillUnmount() {
        this.model.unsubscribeFrom(this, "current_task");
    }

    onChange(newCurrentTask) {
        this.setState((state) => {
            state.currentTask = newCurrentTask;
            return state;
        });
    }

    /* 
     * Clicks to tabList should cause a different tab to be loaded...
     * 
     * 'tabClicked' - a string that represents which tab got clicked. 
     */
    onClick(tabClicked) {
        this.setState((state) => {
            state.currentTabTitle = tabClicked;
            return state;
        })
    }

    render() {
        const tabList = this.state.currentTask.tabs.map((tab) => {
            return tab.name;
        });
        const tabInfo = this.state.currentTask.tabs.filter((tab) => {
            if (tab.title === this.state.currentTabTitle) {
                return tab.info;
            }
        });
        
        return < View 
                    tabList={tabList} 
                    tabToDisplay={this.state.currentTabTitle} 
                    tabInfo={tabInfo} 
                    registerFinalState={this.model.registerFinalState} />;
    }

}

export default TaskDetail;