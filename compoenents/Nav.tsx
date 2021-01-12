import { Nav, NavLink } from "reactstrap";

const ExampleNav = () => {
  return (
    <>
      <Nav className={"bg-dark"} dark color="dark">
        <div className="container-fluid d-flex justify-content-between">
          <NavLink className="navbar-brand d-flex align-items-center" href="/">
            Home
          </NavLink>
          <NavLink
            className="primary navbar-brand d-flex align-items-center"
            href="#"
          >
            Link
          </NavLink>{" "}
          <NavLink className="navbar-brand d-flex align-items-center" href="#">
            Another Link
          </NavLink>{" "}
          <NavLink
            className="navbar-brand d-flex align-items-center"
            disabled
            href="#"
          >
            Disabled Link
          </NavLink>
        </div>
      </Nav>
    </>
  );
};

export default ExampleNav;
