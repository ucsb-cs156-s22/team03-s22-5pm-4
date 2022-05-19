
// {
//     "id": 1,
//     "requesterEmail": "44",
//     "teamId": "352",
//     "tableOrBreakoutRoom": "5325",
//     "requestTime": "2022-05-18T15:54:34",
//     "explanation": "213",
//     "solved": false
// }

const helpRequestFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "arjunsingh@ucsb.edu",
        "teamId": "4",
        "tableOrBreakoutRoom": "table",
        "requestTime": "2022-05-18T15:54:34",
        "explanation": "need help",
        "solved": false
    },
    threeRequests: [
        {
            "id": 1,
            "requesterEmail": "arjunsingh@ucsb.edu",
            "teamId": "4",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2022-05-18T15:54:34",
            "explanation": "need help",
            "solved": false
        },
        {
            "id": 2,
            "requesterEmail": "arjunsingh@ucsb.edu",
            "teamId": "3",
            "tableOrBreakoutRoom": "table",
            "requestTime": "2022-03-18T15:54:34",
            "explanation": "need help too",
            "solved": false
        },
        {
            "id": 3,
            "requesterEmail": "arjunsingh@ucsb.edu",
            "teamId": "1",
            "tableOrBreakoutRoom": "Breakout Room",
            "requestTime": "2022-05-18T15:54:12",
            "explanation": "need help three",
            "solved": true
        }
    ]
};


export { helpRequestFixtures };