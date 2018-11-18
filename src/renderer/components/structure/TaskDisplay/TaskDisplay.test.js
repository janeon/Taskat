import React from 'react';
import TaskDisplay from './index';
import Model from '../../../model/Model';
import { shallow, mount} from 'enzyme';
import { getTestTaskListSmall } from '../../../test_resources/testutils';
import TabList from '../TabList/index';


describe('TaskDisplay', () => {

    it('parses taskList', () => {
        // not really using the model or resources here, just need to 
        // get through TaskDisplay's constructor without crashing
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());
        const td = new TaskDisplay(model);

        const currentTask = getTestTaskListSmall()[0];

        const correctlyParsedTabTitles = currentTask.tabs.map( tab => {
            return tab.title;
        });

        expect(td.getTabList(currentTask)).toEqual(correctlyParsedTabTitles);
    });

    it('parses info based on currentTab', () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());
        const td = new TaskDisplay(model);

        const currentTask = getTestTaskListSmall()[0];

        expect(td.getTabInfo(currentTask, currentTask.tabs[0].title)).toEqual(currentTask.tabs[0].info);
    });

    it('on click changes current tab in state', () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());
        const td = mount(<TaskDisplay model={model}/>);

        const currentTask = getTestTaskListSmall()[2]

        td.instance().onChange(currentTask);
        td.instance().onSwitchTab(currentTask.tabs[0].title);

        expect(td.state().currentTabTitle).toEqual(currentTask.tabs[0].title);
    });

    it('re-renders tabList on changes to currentTask', () => {
        const testing = true;
        const model = new Model(testing, getTestTaskListSmall());
        const td = mount(<TaskDisplay model={model}/>);

        const currentTask = getTestTaskListSmall()[3];

        td.instance().onChange(currentTask);
        td.update();

        const tl = td.find(TabList);
        const tabs = tl.find('.tab');

        expect(tabs.length).toEqual(currentTask.tabs.length);
        expect(tabs.map(el => el.text())).toEqual(currentTask.tabs.map(tab => tab.title));
    });

});

