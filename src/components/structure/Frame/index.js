import React from 'react';
import View from './View';

/*
 * The definition of the Frame component.  
 */
export default function Frame(props) {
    return (
            <View model={props.model}/>
        );
}
