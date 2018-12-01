import React, { Component } from 'react';
import TaskList from '../TaskList';
import TaskDisplay from '../TaskDisplay';
import View from './View'
/*
 * The definition of the Frame component.
 */


 class Frame extends Component {
   constructor(props) {
       super(props);
       this.model = props.model;
     }
    render() {
      return <div id="frame">
          <TaskList model={this.model} ref="TaskList"/>
          <TaskDisplay model={this.model}/>
      </div>
      }
}

export default Frame;
