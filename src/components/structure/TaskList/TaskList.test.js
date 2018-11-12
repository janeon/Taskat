import React from 'react';
import TaskList from './index';
import { getTestTaskListSmall, getMockEvent } from '../../../test_resources/testutils';
import { mount } from 'enzyme';
import Model from '../../../model/Model';
import { NO_DUPLICATE_TASK_TITLES } from '../../../utilities/constants';

describe('TaskList', () => {

    global.console = {
        log: jest.fn()
    }

    // this is also testing that it subscribes to task_key list changes...
    it('should display all tasks', () => {
        const model = new Model(true, getTestTaskListSmall());
        const tl = mount(<TaskList model={model}/>);

        const allRenderedTasks = tl.find('#tasklist').children();
        
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

    it("should update when tasks are added", () => {
        const model = new Model(true, getTestTaskListSmall());
        const tl = mount(<TaskList model={model}/>);

        // verify there are the right number of tasks to start
        // this slice is removing the new-button, which is styled as if it were a task
        const tasksInListPre = tl.find('.task').slice(1);

        expect(tasksInListPre.length).toEqual(getTestTaskListSmall().length);

        // add a new task with new-task-button
        const newTitle = "learn to somersault";
        tl.find('#new-task-input').simulate('change', getMockEvent(newTitle));
        tl.update();
        tl.find('#new-task-button').find('form').simulate('submit', getMockEvent());

        const tasksInListPost = tl.find('.task').slice(1);

        // verify that task was added to the list. 
        expect(tasksInListPost.length).toEqual(getTestTaskListSmall().length + 1);
        expect(tasksInListPost.findWhere((task_el) => task_el.text() === newTitle));
        
    });

    it("shouldn't allow duplicate task titles", () => {
        const model = new Model(true, getTestTaskListSmall());
        const tl = mount(<TaskList model={model}/>);

        const newTitle = getTestTaskListSmall()[2].title;
        tl.find('#new-task-input').simulate('change', getMockEvent(newTitle));
        tl.update();
        tl.find('#new-task-button').find('form').simulate('submit', getMockEvent());

        const tasksInListPost = tl.find('.task').slice(1);

        expect(tasksInListPost.length).toEqual(getTestTaskListSmall().length);
        expect(global.console.log).toHaveBeenCalledWith(NO_DUPLICATE_TASK_TITLES);
    });
});