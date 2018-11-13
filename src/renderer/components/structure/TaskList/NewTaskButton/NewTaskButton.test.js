import React from 'react';
import {shallow, mount} from 'enzyme';
import NewTaskButton from './index';
import { getMockEvent } from '../../../../test_resources/testutils';
import { NO_DUPLICATE_TASK_TITLES, NO_EMPTY_TASK_TITLES } from '../../../../utilities/constants';

describe('NewTaskButton', () => {

    // replace console with spy
    // disable this if you need to see output. 
    global.console = {
        log: jest.fn()
    }

    it("should call 'createTask' on form entry", () => {
        const mock = getMock();
        const nt_btn = mount(<NewTaskButton createTask={mock.call}/>);

        expect(mock.state).toEqual(0);

        const testVal = "fix floor";
        nt_btn.find('#new-task-input').simulate('change', getMockEvent(testVal));
        nt_btn.update();
        nt_btn.find("#new-task-button").find('form').simulate('submit', {});
        
        expect(mock.state).toEqual(1);
    });

    it("should call 'createTask' with proper input", () => {
        const mock = getMock();
        const nt_btn = shallow(<NewTaskButton createTask={mock.callWithValue}/>);

        const testVal = "do a somersault";

        nt_btn.find('#new-task-input').simulate('change', getMockEvent(testVal));

        nt_btn.update();
        
        nt_btn.find("#new-task-button").find('form').simulate('submit', getMockEvent());

        expect(mock.lastValue).toEqual(testVal);
    });

    // Also tests for alert message
    it("should not allow tasks to be created with empty titles", () => {
        const mock = getMock();
        const nt_btn = shallow(<NewTaskButton createTask={mock.callWithValue}/>);

        nt_btn.find('#new-task-input').simulate('change', getMockEvent(""));
        nt_btn.update();
        nt_btn.find("#new-task-button").find('form').simulate('submit', getMockEvent());

        expect(mock.lastValue).toEqual("never clicked");

        expect(global.console.log).toHaveBeenCalledWith(NO_EMPTY_TASK_TITLES);
    });

    it("should reset input on submit clicks", () => {
        const mock = getMock();
        const nt_btn = shallow(<NewTaskButton createTask={mock.callWithValue}/>);

        nt_btn.find('#new-task-input').simulate('change', getMockEvent("clean potatoes"));
        nt_btn.update();
        nt_btn.find("#new-task-button").find('form').simulate('submit', getMockEvent());

        nt_btn.update();

        expect(nt_btn.find('#new-task-input').text()).toEqual(nt_btn.instance().initialState().value);
    });
});

function getMock() {
    const mock = {
        state: 0,
        lastValue: "never clicked",
        call() {
            mock.state += 1;
            return true;
        },
        // returns true, 
        callWithValue(val) {
            mock.lastValue = val;
            return true;
        },
        // returns false
        callWithValueF(val) {
            mock.lastValue = val
            return false;
        } 
    }
    return mock;
}