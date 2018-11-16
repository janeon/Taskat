import React from 'react';
import TabList from './index';
import {shallow, mount} from 'enzyme';
import allTabs from '../../'

describe('TabList', () => {

    const tabs = ["analytics", "journal", "calendar", "horoscope"];

    it('should inflate all tabs with title', () => {
        const tl = mount(<TabList tabList={tabs}/>);

        const allRenderedTabs = tl.find('.tab');

        // all tabs should be rendered
        expect(allRenderedTabs.length).toEqual(tabs.length);

        // all titles should be rendered
        allRenderedTabs.forEach( tabElement => {
            expect(tabs.includes(tabElement.text())).toEqual(true);
        });
    });

    it('should attach onClick methods', () => {
        const listener = new MockOnClickListener();
        const onClickMock = listener.onClick;

        const tl = mount(<TabList tabList={tabs} onTabClick={onClickMock}/>);

        const tabToClick = tl.findWhere((el) => el.text() === tabs[3]);

        tabToClick.simulate('click');

        expect(listener.currentTab).toEqual(tabs[3]);
    });

    it('should add tab button', () => {

    });

    it('should determine which tabs to have as options', () => {
        const tabs = ["analytics", "calendar"];
        const tl = shallow(<TabList tabList={tabs} onTabCLick={jest.fn()}/>);

        const tabOptions = tl.instance().parseOptions();

        expect(tabOptions).toEqual(ALL_TABS.filter(tab => !tabs.includes(tab)));
    });

});

class MockOnClickListener {
    constructor() {
        this.onClick = this.onClick.bind(this);
        this.currentTab = "not yet set";
    }

    onClick(title) {
        this.currentTab = title;
    }
}