import React from 'react';

import ArticleTable from "main/components/Article/ArticleTable";
import { articleFixtures } from 'fixtures/ArticleFixtures';

export default {
    title: 'components/Article/ArticleTable',
    component: ArticleTable
};

const Template = (args) => {
    return (
        <ArticleTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    article: []
};

export const threeArticles = Template.bind({});

threeArticles.args = {
    article: articleFixtures.threeArticles
};


