import React from 'react'
import TaskList from './index'
import { getTestTaskListSmall } from '../../../test_resources/testutils'
import { shallow, mount } from 'enzyme'
import Model from '../../../model/Model'

describe('TaskList', () => {
    // this is also testing that it subscribes to task_key list changes...
    it('should display all tasks', () => {
        const model = new Model(true, getTestTaskListSmall());
        const tl = mount(<TaskList model={model}/>);

        const allRenderedTasks = tl.find('.task');
        
        // verify there are the correct number of tasks are displayed
        expect(allRenderedTasks.length).toEqual(getTestTaskListSmall().length);
        
        // verify that all tasks have the correct title
        allRenderedTasks.forEach((el) => {
            expect(model.resources.taskList.map( (task) => { return task.getData().title }).includes(el.text())).toBe(true);
        });
    });

    it("should update 'current_task' on clicks to tasks", () => {
        const model = new Model(true, getTestTaskListSmall());
        const tl = mount(<TaskList model={model} />);

        // grab the task from the list with key "1"
        const secondTask = tl.find('.task').findWhere((task_element) => task_element.key() === "1");

        // make sure we got a task
        expect(secondTask.key()).toEqual("1");

        secondTask.simulate('click');

        expect(model.resources.currentTask.getData().key).toEqual(1);
    });

    // FINISH THESE

});