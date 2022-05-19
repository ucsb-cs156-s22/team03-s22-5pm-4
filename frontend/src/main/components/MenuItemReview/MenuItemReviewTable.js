import OurTable from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import {  onDeleteSuccess } from "main/utils/MenuItemReviewUtils"
// import { useNavigate } from "react-router-dom";
import { _hasRole } from "main/utils/currentUser";

export default function MenuItemReviewTable({ review, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/MenuItemReview/all"]
    // );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Item Id',
            accessor: 'itemId', // needed for tests
        },
        {
            Header: 'Reviewer Email',
            accessor: 'reviewerEmail', // needed for tests

        },
        {
            Header: 'Stars',
            accessor: 'stars', // needed for tests
        },
        {
            Header: 'Date Reviewed',
            accessor: 'dateReviewed',
        },
        {
            Header: 'Comments',
            accessor: 'comments',
        }
    ];

    const _testid = "MenuItemReviewTable";

    // const columnsIfAdmin = [
    //     ...columns,
    //     // ButtonColumn("Edit", "primary", editCallback, testid),
    //     ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];

    //const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    const columnsToDisplay = columns;

    return <OurTable
        data={review}
        columns={columnsToDisplay}
        testid={"MenuItemReviewTable"}
    />;
};