import React from 'react'
import TaskList from './index'
import { getTestTaskListSmall } from '../../../test_resources/testutils'
import { shallow, mount } from 'enzyme'
import Model from '../../../model/Model'

describe('TaskList', () => {
    it('should display all tasks', () => {
        const model = new Model(true, getTestTaskListSmall());
        const tl = mount(<TaskList model={model}/>);

        const allRenderedTasks = tl.find('.task');
        
        expect(allRenderedTasks.length).toEqual(getTestTaskListSmall().length);
        
        allRenderedTasks.forEach((el) => {
            expect(model.resources.taskList.map( (task) => { return task.getData().title }).includes(el.text())).toBe(true);
        });
    });

    // FINISH THESE

});