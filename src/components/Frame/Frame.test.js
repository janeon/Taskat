// The Frame should hook up the TaskList and the TaskDisplay to the model...
import React from 'react'
import { shallow } from 'enzyme'
import Frame from './'
import { getTestTaskList } from '../../TestResources/testutils'

describe('Frame', () => {
    it('renders TaskList and TabList', () => {
        const frame = shallow(<Frame />);
    
        expect(frame.find('TaskList')).not.toEqual(null);
        expect(frame.find('TabList')).not.toEqual(null);
    });

    
});

