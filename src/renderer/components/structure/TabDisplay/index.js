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

// <<<<<<< HEAD
      render() {
          return <View
            registerFinalState={this.state.registerFinalStateFunc}
            tabToDisplay={this.state.tabToDisplay}
            />;
      }
// =======
//     render() {
//
//         //var wrapper = <div id="tab-display"></div>;
//
//         switch(this.tabToDisplay) {
//             case "analytics":
//                 return (
//                     <div id="tab-display">
//                         <Analytics />
//                     </div>
//                 );
//             case "calendar":
//                 return (
//                     <div id="tab-display">
//                         <Calendar />
//                     </div>
//                 );
//             case "journal":
//                 return (
//                     <div id="tab-display">
//                         <Journal/>
//                     </div>
//                 );
//             case "menu":
//                 console.log("display menu");
//                 break;
//             case "welcome tab":
//                 //console.log("display welcome tab");
//                 break;
//             default:
//                 console.log(`TabDisplay parser didn't recognize ${this.tabToDisplay}`);
//                 break;
//         }
//         return <View />;
//     }
// >>>>>>> baaadca39c86c7d411f4853ea0037751b117c838

}

export default TabDisplay;
