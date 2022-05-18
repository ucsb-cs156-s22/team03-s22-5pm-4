import OurTable, { _ButtonColumn} from "main/components/OurTable";
import { _useBackendMutation } from "main/utils/useBackend";
// import { useNavigate } from "react-router-dom";
import { _hasRole } from "main/utils/currentUser";


export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/ucsbdiningcommonsmenuitem",
        method: "DELETE",
        params: {
            code: cell.row.values.code
        }
    }
}

export default function DiningCommonsMenuItemTable({ diningCommonsMenuItem, _currentUser }) {

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdiningcommonsmenuitem/all"]
    // );delet
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Dining Commons Code',
            accessor: 'diningCommonsCode', 
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Station',
            accessor: 'station',
        }
    ];

    const testid = "DiningCommonsMenuItemTable";

    // const columnsIfAdmin = [
    //     ...columns,
    //     // ButtonColumn("Edit", "primary", editCallback, testid),
    //     ButtonColumn("Delete", "danger", deleteCallback, testid)
    // ];

    //const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    const columnsToDisplay = columns;

    return <OurTable
        data={diningCommonsMenuItem}
        columns={columnsToDisplay}
        testid={testid}
    />;
};