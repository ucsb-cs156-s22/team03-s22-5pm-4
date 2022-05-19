import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/DiningCommonsMenuItemUtils";
import { _useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import { cellToAxiosParamsDelete } from "main/utils/DiningCommonsMenuItemUtils";

export default function DiningCommonsMenuItemTable({ diningCommonsMenuItem, currentUser }) {

    //Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsbdiningcommonsmenuitem/all"]
    );
    //Stryker enable all 

    //Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'ID',
            accessor: 'id'
        },
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

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    //const columnsToDisplay = columns;

    return <OurTable
        data={diningCommonsMenuItem}
        columns={columnsToDisplay}
        testid={testid}
    />;
};