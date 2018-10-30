// the definition of the Frame objects
import React, { Component }  from 'react';
import View from './View';
export default class Frame extends Component {

    render() {
        return (
            <View tasks={this.props.tasks}/>
        );
    }
}
