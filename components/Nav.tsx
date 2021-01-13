import { Nav, NavLink, Container } from "reactstrap";
import Link from "next/link";

const ExampleNav = () => {
  return (
    <>
      <Nav className={"bg-dark"} color="dark">
        <Container fluid>
          <Container className="d-flex ">
            <NavLink
              style={{ color: "white" }}
              className="navbar-brand d-flex align-items-center"
              href="/"
            >
              Home
            </NavLink>
            <NavLink
              style={{ color: "white" }}
              className="primary navbar-brand d-flex align-items-center"
              href="#"
            >
              Link
            </NavLink>{" "}
            <NavLink
              style={{ color: "white" }}
              className="navbar-brand d-flex align-items-center"
              href="#"
            >
              Another Link
            </NavLink>
          </Container>
        </Container>
      </Nav>
    </>
  );
};

export default ExampleNav;
