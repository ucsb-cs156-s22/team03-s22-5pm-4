import OurTable from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
// import { hasRole } from "main/utils/currentUser";


// export function cellToAxiosParamsDelete(cell) {
//     return {
//         url: "/api/ucsbdiningcommons",
//         method: "DELETE",
//         params: {
//             code: cell.row.values.code
//         }
//     }
// }

export default function HelpRequestTable({ helpRequest, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdiningcommons/all"]
    // );
    // // Stryker enable all 

    // // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }



    // {
    //     "id": 1,
    //     "requesterEmail": "44",
    //     "teamId": "352",
    //     "tableOrBreakoutRoom": "5325",
    //     "requestTime": "2022-05-18T15:54:34",
    //     "explanation": "213",
    //     "solved": false
    // }


    const columns = [
        {
            Header: 'Id',
            accessor: 'id', 
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        },
        {
            Header: 'Team Id',
            accessor: 'teamId',
        },
        {
            Header: 'Table or Breakout Room',
            accessor: 'tableOrBreakoutRoom',

        },
        {
            Header: 'Time of Request',
            accessor: 'requestTime',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Solved?',
            accessor: 'solved',
            accessor: (row, _rowIndex) => String(row.solved)
        }
    ];

    const testid = "HelpRequestTable";

    // const columnsIfAdmin = [
    //     ...columns,
    //     // ButtonColumn("Edit", "primary", editCallback, testid),
    //     ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];

    const columnsToDisplay = columns;

    return <OurTable
        data={helpRequest}
        columns={columnsToDisplay}
        testid={testid}
    />;
};