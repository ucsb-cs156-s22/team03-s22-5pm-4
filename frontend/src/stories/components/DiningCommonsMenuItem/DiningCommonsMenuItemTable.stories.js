import React from 'react';

import DiningCommonsMenuItemTable from "main/components/DiningCommonsMenuItem/DiningCommonsMenuItemTable";
import { diningCommonsMenuItemFixtures } from 'fixtures/diningCommonsMenuItemFixtures';

export default {
    title: 'components/DiningCommonsMenuItem/DiningCommonsMenuItemTable',
    component: DiningCommonsMenuItemTable
};

const Template = (args) => {
    return (
        <DiningCommonsMenuItemTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    diningCommonsMenuItem: []
};

export const ThreeMenuItems = Template.bind({});

ThreeMenuItems.args = {
    diningCommonsMenuItem: diningCommonsMenuItemFixtures.threeMenuItems
};


