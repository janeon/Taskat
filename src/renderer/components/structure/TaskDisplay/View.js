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
// <<<<<<< HEAD
//     {tabList, onSwitchTab, tabToDisplay, tabInfo, registerFinalState,
//       taskKey, deleteTaskOnClick, currentTaskTabList, onDeleteTab}) => {
//     // console.log("tabToDisplay in view of TaskDisplay", tabToDisplay);
//       return (
//         <div id="task-display">
//           <TabList tabList={tabList}
//                    onSwitchTab={onSwitchTab}
//                    currentTaskTabList={currentTaskTabList}
//                    tabToDisplay={tabToDisplay}
//                    onDeleteTab={onDeleteTab}
//           />
//           <TabDisplay
//                 tabToDisplay={tabToDisplay}
//                 tabInfo={tabInfo}
//                 registerFinalState={registerFinalState}
//                 taskKey={taskKey}
//                 deleteTaskOnClick={deleteTaskOnClick}
//                 />
// // =======
    {tabList, displayNewTabButton, addTabToTask, onSwitchTab,
      tabToDisplay, tabInfo, registerFinalState, taskKey, deleteTaskOnClick, currentTaskTabList, onDeleteTab}
  ) => {
      return (
        <div id="task-display">
          <TabList
            tabList={tabList}
            onSwitchTab={onSwitchTab}
            currentTaskTabList={currentTaskTabList}
            tabToDisplay={tabToDisplay}
            onDeleteTab={onDeleteTab}
            displayNewTabButton={displayNewTabButton}
            taskKey={taskKey}
            addTabToTask={addTabToTask}/>
          <TabDisplay
            tabToDisplay={tabToDisplay}
            tabInfo={tabInfo}
            registerFinalState={registerFinalState}
            taskKey={taskKey}
            deleteTaskOnClick={deleteTaskOnClick}/>
// >>>>>>> baaadca39c86c7d411f4853ea0037751b117c838
        </div>)}

export default View;
