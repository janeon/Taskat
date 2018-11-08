import React, { Component } from 'react';
import View from './View';

class TabDisplay extends Component {

    constructor(props) {
        super(props);

        this.tabInfo = props.tabInfo;
        // this is being passed the registerFinalState function, it just isn't passing it yet. 
    }

    componentWillReceiveProps(newProps) {
        this.tabInfo = newProps.tabInfo;
    }

    render() {
        // TODO -> parse tabinfo to decide what to render...
        return <View />;
    }

}

export default TabDisplay;