const reviewFixtures = {
    oneReview: {
        "itemId": 1,
        "reviewerEmail": "cgaucho@ucsb.edu",
        "stars": 5,
        "dateReviewed": "2022-05-18T12:00:00",
        "comments": "Comment."
    },
    threeReviews: [
        {
            "itemId": 1,
            "reviewerEmail": "test1@ucsb.edu",
            "stars": 5,
            "dateReviewed": "2022-05-18T09:00:00",
            "comments": "Good."
        },
        {
            "itemId": 2,
            "reviewerEmail": "test2@ucsb.edu",
            "stars": 3,
            "dateReviewed": "2022-05-18T08:00:00",
            "comments": "Decent."
        },
        {
            "itemId": 3,
            "reviewerEmail": "test3@ucsb.edu",
            "stars": 1,
            "dateReviewed": "2022-05-18T10:00:00",
            "comments": "Bad."
        } 
    ]
};


export { reviewFixtures };