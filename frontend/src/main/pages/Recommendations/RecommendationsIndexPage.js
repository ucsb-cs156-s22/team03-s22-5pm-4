import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
// import DiningCommonsTable from 'main/components/DiningCommons/DiningCommonsTable';
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook

export default function RecommendationsIndexPage() {

  const _currentUser = useCurrentUser();

  const { data: _diningCommons, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/recommendations/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/recommendations/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        {/* <h1>UCSB Dining Commons</h1>
        <DiningCommonsTable diningCommons={diningCommons} currentUser={currentUser} /> */}
        This is where the index page will go
      </div>
    </BasicLayout>
  )
}