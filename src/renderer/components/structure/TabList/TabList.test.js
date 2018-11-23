import React from 'react';
import TabList from './index';
import {shallow, mount} from 'enzyme';
import { ALL_TABS } from '../../../utilities/constants';

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

        const tabs = ["analytics", "calendar"];

        const tl = mount(<TabList tabList={tabs} onSwitchTab={onClickMock}/>);

        // This filters the result of that search so that only the clickable part is grabbed
        const tabToClick = tl.find(".tab").findWhere((el) => el.text() === tabs[1]);

        tabToClick.simulate('click');

        expect(listener.currentTab).toEqual(tabs[1]);
    });

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