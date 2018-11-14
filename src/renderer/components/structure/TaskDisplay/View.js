import React from 'react';
import TabList from '../TabList';
import TabDisplay from '../TabDisplay';
import './TaskDisplay.css';

/*
 * Render the TaskDisplay component, which renders the TabList and TabDisplay components. 
 *
 * This passes down the list of tabs, the title of the tab to display, and the info it will need from the 
 * current task.
 */
const View = (
    {tabList, onTabClick, tabToDisplay, tabInfo, registerFinalState, taskKey, deleteTaskOnClick}
  ) => {
      return (
        <div id="task-display">
          <TabList tabList={tabList} onTabClick={onTabClick}/>
          <TabDisplay 
                tabToDisplay={tabToDisplay} 
                tabInfo={tabInfo} 
                registerFinalState={registerFinalState}
                taskKey={taskKey}
                deleteTaskOnClick={deleteTaskOnClick}/>  
        </div>)}

export default View;
