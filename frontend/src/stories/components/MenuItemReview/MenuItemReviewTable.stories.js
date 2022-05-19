import React from 'react';

import MenuItemReviewTable from "main/components/MenuItemReview/MenuItemReviewTable";
import { reviewFixtures } from 'fixtures/reviewFixtures';

export default {
    title: 'components/MenuItemReview/MenuItemReviewTable',
    component: MenuItemReviewTable
};

const Template = (args) => {
    return (
        <MenuItemReviewTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    review: []
};

export const ThreeReviews = Template.bind({});

ThreeReviews.args = {
    review: reviewFixtures.threeReviews
};