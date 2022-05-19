import React from 'react';

import HelpRequestTable from 'main/components/HelpRequest/HelpRequestTable';
import { helpRequestFixtures } from 'fixtures/helpRequestFixtures';

export default {
    title: 'components/HelpRequest/HelpRequestTable',
    component: HelpRequestTable
};

const Template = (args) => {
    return (
        <HelpRequestTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    helpRequest: []
};

export const ThreeRequests = Template.bind({});

ThreeRequests.args = {
    helpRequest: helpRequestFixtures.threeRequests
};


