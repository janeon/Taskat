import React from 'react'
import { shallow } from 'enzyme'
import Frame from './'

describe('Frame', () => {
    it('renders TaskList and TabList', () => {
        const frame = shallow(<Frame />);
    
        expect(frame.find('TaskList')).not.toEqual(null);
        expect(frame.find('TabList')).not.toEqual(null);
    });
});

