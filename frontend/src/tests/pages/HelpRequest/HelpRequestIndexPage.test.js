import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import HelpRequestIndexPage from "main/pages/HelpRequest/HelpRequestIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
// import { diningCommonsFixtures } from "fixtures/diningCommonsFixtures";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";

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

describe("UCSBDatesIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "HelpRequestTable";

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
        axiosMock.onGet("/api/HelpRequest/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/HelpRequest/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three helpRequests without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/HelpRequest/all").reply(200, helpRequestFixtures.threeRequests);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); } );
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    test("renders three helpRequests without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/HelpRequest/all").reply(200, helpRequestFixtures.threeRequests);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/HelpRequest/all").timeout();

        const { queryByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

        const expectedHeaders = ['Id',  'Requester Email', 'Team Id','Table or Breakout Room','Time of Request','Explanation','Solved?'];
    
        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

    // test("test what happens when you click delete, admin", async () => {
    //     setupAdminUser();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/HelpRequest/all").reply(200, helpRequestFixtures.threeRequests);
    //     axiosMock.onDelete("/api/ucsbdiningcommons", {params: {code: "de-la-guerra"}}).reply(200, "DiningCommons with id de-la-guerra was deleted");


    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <HelpRequestIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

    //    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("de-la-guerra"); 


    //     const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    //     expect(deleteButton).toBeInTheDocument();
       
    //     fireEvent.click(deleteButton);

    //     await waitFor(() => { expect(mockToast).toBeCalledWith("DiningCommons with id de-la-guerra was deleted") });

    // });

});


