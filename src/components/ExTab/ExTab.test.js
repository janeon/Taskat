/*
 * This is where the tests go
 */
import React from 'react';
// 'enzyme' is a testing tool that renders a fake DOM, 
// 'shallow()' will render only the component itself, 
// 'mount()' will render all the children (more potential for errors)
import { mount, shallow } from 'enzyme';
import ExTab from './index.js';

// what are you testing 
describe('ExTab', () => {

    // this is the test of an individual component
    it('should render on render()', () => {
        const extab = shallow(<ExTab />).render();
    
        // search the wrapper (which shallow() returns) for elements with the class 
        // 'ExTab' (it borrows css syntax)
        expect(extab.find('.ExTab')).not.toEqual(null);
    });

    it('should have the right title', () => {
        const extab = mount(<ExTab />);

        console.log(extab.find('ExTab').text());

        expect(extab.find('.ExTab').text()).toEqual("tomatoes, apples, big difference.");
    });
});

// To run only these tests, use " npm test 'ExTab' "

// this is a good resource 'https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675'