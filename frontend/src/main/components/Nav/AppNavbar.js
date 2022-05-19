import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost"

export default function AppNavbar({ currentUser, systemInfo, doLogout, currentUrl = window.location.href }) {
  return (
    <>
      {
        (currentUrl.startsWith("http://localhost:3000") || currentUrl.startsWith("http://127.0.0.1:3000")) && (
          <AppNavbarLocalhost url={currentUrl} />
        )
      }
      <Navbar expand="xl" variant="dark" bg="dark" sticky="top" data-testid="AppNavbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Example
          </Navbar.Brand>

          <Navbar.Toggle />

          <>
            {/* be sure that each NavDropdown has a unique id and data-testid */}
          </>

          <Navbar.Collapse>
            {/* This `nav` component contains all navigation items that show up on the left side */}
            <Nav className="me-auto">
              {
                systemInfo?.springH2ConsoleEnabled && (
                  <>
                    <Nav.Link href="/h2-console">H2Console</Nav.Link>
                  </>
                )
              }
              {
                systemInfo?.showSwaggerUILink && (
                  <>
                    <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                  </>
                )
              }
              {
                hasRole(currentUser, "ROLE_ADMIN") && (
                  <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown" >
                    <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Todos" id="appnavbar-todos-dropdown" data-testid="appnavbar-todos-dropdown" >
                    <NavDropdown.Item as={Link} to="/todos/list">List Todos</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/todos/create">Create Todo</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Help Requests" id="appnavbar-help-request-dropdown" data-testid="appnavbar-help-request-dropdown" >
                    <NavDropdown.Item as={Link} to="/HelpRequest/list" data-testid="appnavbar-help-request-list">List Help Requests</NavDropdown.Item>
                  </NavDropdown>
                )
              }
               {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="UCSB Dining Commons" id="appnavbar-dining-commons-dropdown" data-testid="appnavbar-dining-commons-dropdown" >
                    <NavDropdown.Item as={Link} to="/diningCommons/list" data-testid="appnavbar-dining-commons-list">List Dining Commons</NavDropdown.Item>
                  </NavDropdown>
                )
              }
                             {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="UCSB Organization" id="appnavbar-organization-dropdown" data-testid="appnavbar-organization-dropdown" >
                    <NavDropdown.Item as={Link} to="/organization/list" data-testid="appnavbar-organization-list">List Organizations</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="UCSBDates" id="appnavbar-ucsbdates-dropdown" data-testid="appnavbar-ucsbdates-dropdown" >
                    <NavDropdown.Item as={Link} to="/ucsbdates/list" data-testid="appnavbar-ucsbdates-list">List</NavDropdown.Item>
                    {
                      hasRole(currentUser, "ROLE_ADMIN") && (
                        <NavDropdown.Item as={Link} to="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item>
                      )
                    }
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="UCSBDiningCommonsMenuItems" id = "appnavbar-ucsbdiningcommonsmenuitem-dropdown" data-testid = "appnavbar-ucsbdiningcommonsmenuitem-dropdown" >
                    <NavDropdown.Item as={Link} to="/ucsbdiningcommonsmenuitem/list" data-testid="appnavbar-ucsbdiningcommonsmenuitem-list">List</NavDropdown.Item>
                     </NavDropdown>
                )
              }
            {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Recommendations" id="appnavbar-recommendations-dropdown" data-testid="appnavbar-recommendations-dropdown" >
                    <NavDropdown.Item as={Link} to="/recommendations/list" data-testid="appnavbar-recommendations-list">List Recommendations</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Article" id="appnavbar-article-dropdown" data-testid="appnavbar-article-dropdown" >
                    <NavDropdown.Item as={Link} to="/article/list" data-testid="appnavbar-article-list">List Articles</NavDropdown.Item>
                    {/* <NavDropdown.Item as={Link} to="/articles/create">Create Articles</NavDropdown.Item> */}
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Reviews" id="appnavbar-reviews-dropdown" data-testid="appnavbar-reviews-dropdown" >
                    <NavDropdown.Item as={Link} to="/reviews/list" data-testid="appnavbar-reviews-list">List Reviews</NavDropdown.Item>
                  </NavDropdown>
                )
              }
            </Nav>

            <Nav className="ml-auto">
              {/* This `nav` component contains all navigation items that show up on the right side */}
              {
                currentUser && currentUser.loggedIn ? (
                  <>
                    <Navbar.Text className="me-3" as={Link} to="/profile">Welcome, {currentUser.root.user.email}</Navbar.Text>
                    <Button onClick={doLogout}>Log Out</Button>
                  </>
                ) : (
                  <Button href="/oauth2/authorization/google">Log In</Button>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container >
      </Navbar >
    </>
  );
}
