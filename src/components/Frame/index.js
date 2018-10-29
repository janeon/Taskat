// the definition of the Frame object
import React, { Component }  from 'react';
import View from './View';
import Calendar from 'react-calendar';
export default class Frame extends Component {
// why is there a view file/component on top of the index.js for the frame component itself?
    render() {
        return (
            <View tasks={this.props.tasks}/>
        );
    }

}
