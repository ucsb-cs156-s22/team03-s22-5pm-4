import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import OrganizationIndexPage from "main/pages/Organization/OrganizationIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
//import { organizationFixtures } from "fixtures/organizationFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import _mockConsole from "jest-mock-console";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

describe("UCSBOrganizationIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "DiningCommonsTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/organization/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <OrganizationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/organization/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <OrganizationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    // test("renders three diningCommon without crashing for regular user", async () => {
    //     setupUserOnly();
    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/ucsbdiningcommons/all").reply(200, diningCommonsFixtures.threeCommons);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <DiningCommonsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra"); } );
    //     expect(getByTestId(`${testId}-cell-row-1-col-code`)).toHaveTextContent("ortega");
    //     expect(getByTestId(`${testId}-cell-row-2-col-code`)).toHaveTextContent("portola");

    // });

    // test("renders three diningCommons without crashing for admin user", async () => {
    //     setupAdminUser();
    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/ucsbdiningcommons/all").reply(200, diningCommonsFixtures.threeCommons);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <DiningCommonsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra"); });
    //     expect(getByTestId(`${testId}-cell-row-1-col-code`)).toHaveTextContent("ortega");
    //     expect(getByTestId(`${testId}-cell-row-2-col-code`)).toHaveTextContent("portola");

    // });

    // test("renders empty table when backend unavailable, user only", async () => {
    //     setupUserOnly();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/ucsbdiningcommons/all").timeout();

    //     const { queryByTestId, getByText } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <DiningCommonsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

    //     const expectedHeaders = ['Code',  'Name', 'Sack Meal?','Takeout Meal?','Dining Cam?','Latitude','Longitude'];
    
    //     expectedHeaders.forEach((headerText) => {
    //       const header = getByText(headerText);
    //       expect(header).toBeInTheDocument();
    //     });

    //     expect(queryByTestId(`${testId}-cell-row-0-col-code`)).not.toBeInTheDocument();
    // });

    // test("test what happens when you click delete, admin", async () => {
    //     setupAdminUser();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/ucsbdiningcommons/all").reply(200, diningCommonsFixtures.threeCommons);
    //     axiosMock.onDelete("/api/ucsbdiningcommons", {params: {code: "de-la-guerra"}}).reply(200, "DiningCommons with id de-la-guerra was deleted");


    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <DiningCommonsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toBeInTheDocument(); });

    //    expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra"); 


    //     const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    //     expect(deleteButton).toBeInTheDocument();
       
    //     fireEvent.click(deleteButton);

    //     await waitFor(() => { expect(mockToast).toBeCalledWith("DiningCommons with id de-la-guerra was deleted") });

    // });

});


