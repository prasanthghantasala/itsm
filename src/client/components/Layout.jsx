import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      {pathname === "/" || pathname === "/register" ? (
        <div style={{ height: "100vh" }}>{<Outlet />}</div>
      ) : (
        <div className="container mt-5">{<Outlet />}</div>
      )}
    </div>
  );
};

export default Layout;
