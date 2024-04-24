import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [role, setRole] = React.useState("user");

  const dashboardLink = location.pathname === "/" ? "/" : "/dashboard";

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setIsLoggedIn(true);
    }
    setRole(localStorage.getItem("role"));
  }, [location]);

  return (
    <nav className="navbar navbar-dark bg-dark border-light shadow-sm py-3">
      <div className="container">
        <div className="d-flex justify-content-between w-100">
          <div className="col-3">
            <Link
              to={dashboardLink}
              className="navbar-brand text-light mb-0 text-light fs-6"
            >
              Service Ticket Management
            </Link>
          </div>
          <div
            className={`col-9 d-inline-flex justify-content-end ${
              isLoggedIn ? "" : "d-none"
            }`}
          >
            {/* links for incidents, service requests, logout */}
            {/* dashboard */}
            <Link
              to="/dashboard"
              className="text-light text-decoration-none me-3 app__link"
            >
              {" "}
              Dashboard{" "}
            </Link>
            <Link
              to="/service-requests"
              className="text-light text-decoration-none me-3 app__link"
            >
              {" "}
              Service Requests{" "}
            </Link>
            {/* templates */}
            <Link
              to="/templates"
              className="text-light text-decoration-none me-3 app__link"
              hidden={role === "USER"}
            >
              {" "}
              Templates{" "}
            </Link>
            {/* users */}
            <Link
              to="/users"
              className="text-light text-decoration-none me-3 app__link"
              hidden={role === "USER"}
            >
              {" "}
              Users{" "}
            </Link>
            {/* teams */}
            <Link
              to="/teams"
              className="text-light text-decoration-none me-3 app__link"
              hidden={role === "USER"}
            >
              {" "}
              Teams{" "}
            </Link>
            <Link
              to="/logout"
              className="text-light text-decoration-none me-3 app__link"
            >
              {" "}
              Logout{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
