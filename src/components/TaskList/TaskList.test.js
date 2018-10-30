import React from 'react'
import TaskList from './index'
import { getTestTaskListSmall } from '../../TestResources/testutils'
import { shallow, mount } from 'enzyme'
import Model from '../../Model/Model'

describe('TaskList', () => {
    it('should display all tasks', () => {
        const model = new Model();
        model.allTasks.data = getTestTaskListSmall();
        const tl = mount(<TaskList model={model}/>);

        const allRenderedTasks = tl.find('.task');
        
        expect(allRenderedTasks.length).toEqual(getTestTaskListSmall().length);
        
        allRenderedTasks.forEach((el) => {
            expect(model.getAllTaskTitles().includes(el.text())).toBe(true);
        });
    });
    it('should update display when the model\'s task list changes', () => {
        const model = new Model();
        model.allTasks.updateData(getTestTaskListSmall());
        const tl = mount(<TaskList model={model}/>);

        // removing one of the tasks
        model.allTasks.updateData(getTestTaskListSmall().filter((task) => {
            if (task.title != "pick up kid") {
                return task;
            }
        }));

        tl.update();
        const allRenderedTasks = tl.find('.task');
        expect(allRenderedTasks.length).toEqual(getTestTaskListSmall().length - 1);
        
        allRenderedTasks.forEach((el) => {
            expect(model.getAllTaskTitles().includes(el.text())).toBe(true);
        });
        
    });
    it('should unsubscribe when unmounting', () => {
        const model = new Model();
        model.allTasks.data = getTestTaskListSmall();
        const tl = mount(<TaskList model={model}/>);

        expect(model.allTasks.subscribers.length).toEqual(1);

        tl.unmount();



        expect(model.allTasks.subscribers.length).toEqual(0);
    });
});