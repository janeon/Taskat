import React from 'react';
// 'enzyme' is a testing tool that renders a fake DOM, 
// 'shallow()' will render only the component itself, 
// 'mount()' will render all the children (more potential for errors)
import { mount, shallow } from 'enzyme';
import ExTab from './index.js';

/*
 * This is where the tests go
 */

// what are you testing 
describe('ExTab', () => {

    // this is the test of an individual method
    it('should render on render()', () => {
        const extab = shallow(<ExTab />);
    
        // search the wrapper (which shallow() returns) for elements with the class 
        // 'ExTab' (it borrows css syntax)
        expect(extab.find('.ExTab')).not.toEqual(null);
    });

    // verify rendered data (which in this case requires mount() rather than shallow())
    it('should have the right title', () => {
        const extab = mount(<ExTab />);

        expect(extab.find('.ExTab').text()).toEqual("tomatoes, apples, big difference.");
    });

    it('should increment \'state.data\' on button clicks', () => {
        const extab = mount(<ExTab />);

        extab.find('.exbutton').simulate('click');
        extab.find('.exbutton').simulate('click');

        expect(extab.state().data).toEqual(2);
    });
});

// To run only these tests, use " npm test 'ExTab' "

// this is a good resource 'https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675'