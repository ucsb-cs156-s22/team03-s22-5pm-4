import { _fireEvent, render, _waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import MenuItemReviewIndexPage from "main/pages/MenuItemReview/MenuItemReviewIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { reviewFixtures } from "fixtures/reviewFixtures";
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

describe("MenuItemReviewIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);


    const testId = "MenuItemReviewTable";

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
        axiosMock.onGet("/api/MenuItemReview/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/MenuItemReview/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    // test("renders three reviews without crashing for regular user", async () => {
    //     setupUserOnly();
    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/MenuItemReview/all").reply(200, reviewFixtures.threeReviews);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-itemId`)).toHaveTextContent(1); } );
    //     expect(getByTestId(`${testId}-cell-row-1-col-itemId`)).toHaveTextContent(2);
    //     expect(getByTestId(`${testId}-cell-row-2-col-itemId`)).toHaveTextContent(3);

    // });

    // test("renders three reviews without crashing for admin user", async () => {
    //     setupAdminUser();
    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/MenuItemReview/all").reply(200, reviewFixtures.threeReviews);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-itemId`)).toHaveTextContent(1); });
    //     expect(getByTestId(`${testId}-cell-row-1-col-itemId`)).toHaveTextContent(2);
    //     expect(getByTestId(`${testId}-cell-row-2-col-itemId`)).toHaveTextContent(3);

    // });

    // test("renders empty table when backend unavailable, user only", async () => {
    //     setupUserOnly();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/MenuItemReview/all").timeout();

    //     const { queryByTestId, getByText } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemReviewIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );

    //     await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

    //     const expectedHeaders = ['Item Id','Reviewer Email','Stars','Date Reviewed','Comments'];
    
    //     expectedHeaders.forEach((headerText) => {
    //       const header = getByText(headerText);
    //       expect(header).toBeInTheDocument();
    //     });

    //     expect(queryByTestId(`${testId}-cell-row-0-col-itemId`)).not.toBeInTheDocument();
    // });

});