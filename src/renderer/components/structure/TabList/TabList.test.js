import React from 'react';
import TabList from './index';
import {shallow, mount} from 'enzyme';
<<<<<<< HEAD
import allTabs from '../../'
=======
import { ALL_TABS } from '../../../utilities/constants';
>>>>>>> new-tab-button

describe('TabList', () => {

    const tabs = ["analytics", "journal", "dancing", "horoscope"];

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

    it('should attach onClick methods to tabs', () => {
        const listener = new MockOnClickListener();
        const onClickMock = listener.onClick;

        const tl = mount(<TabList tabList={tabs} onTabClick={onClickMock}/>);

        const tabToClick = tl.findWhere((el) => el.text() === tabs[3]);

        tabToClick.simulate('click');

        expect(listener.currentTab).toEqual(tabs[3]);
    });

<<<<<<< HEAD
    it('should add tab button', () => {

    });

    it('should determine which tabs to have as options', () => {
        const tabs = ["analytics", "calendar"];
        const tl = shallow(<TabList tabList={tabs} onTabCLick={jest.fn()}/>);

        const tabOptions = tl.instance().parseOptions();

        expect(tabOptions).toEqual(ALL_TABS.filter(tab => !tabs.includes(tab)));
=======
    it("should render new-tab-button when 'displayNewTabButton' is true", () => {
        const tl = mount(<TabList tabList={tabs} displayNewTabButton={true}/>);

        const button = tl.find('#new-tab-button');

        expect(button.length).toEqual(1);
    });

    it("should not render new-tab-button when 'displayNewTabButton' is false", () => {
        const tl = mount(<TabList tabList={tabs} displayNewTabButton={false}/>);

        const button = tl.find('#new-tab-button');

        expect(button.length).toEqual(0);
    });

    it("should not render new-tab-button when 'newTabButtonTabs' is empty", () => {
        const fullTabList = ALL_TABS;
        const tl = mount(<TabList tabList={fullTabList} displayNewTabButton={true}/>);

        const button = tl.find('#new-tab-button');

        expect(button.length).toEqual(0);
    })

    it("should parse options for newTabButton", () => {
        const tabs = ["analytics", "calendar"];

        const tlInst = shallow(<TabList tabList={tabs} />).instance();

        const correctOptions = ALL_TABS.filter(tab => ! tabs.includes(tab));

        expect(tlInst.parseTabOptions(tabs)).toEqual(correctOptions);
>>>>>>> new-tab-button
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