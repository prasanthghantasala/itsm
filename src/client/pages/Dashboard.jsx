import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import RetryIcon from "bootstrap-icons/icons/arrow-clockwise.svg?react";
import axios from "../utils/axios";
const Dashboard = () => {
  const [role, setRole] = React.useState("USER");
  const [dashboard, setDashboard] = React.useState({
    incidents: {},
  });

  const getData = async () => {
    axios
      .get("/dashboard")
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="">
      <div className="row">
        <div className="row m-0 mt-5">
          <div className="col-md-6">
            <h4 className="fw-bolder mb-0">
              {role === "ADMIN" ? "All" : "My"} Incidents
            </h4>
          </div>
          <div className="col-auto ms-auto">
            <button
              className="btn btn-outline-dark btn-sm d-inline-flex align-items-center"
              onClick={getData}
            >
              Refresh
              <RetryIcon className="ms-1" />
            </button>
          </div>
        </div>
        <div className="row mt-2 m-0">
          {Object.keys(dashboard?.incidents).map((key) => (
            <a
              href={`service-requests?status=${key}`}
              className="col-md-4 mt-3 text-decoration-none"
            >
              <Card className="shadow-s">
                <Card.Body>
                  <h1 className="font-black fw-bold mb-0">
                    {dashboard.incidents[key]}
                  </h1>
                  <p className="mb-0 small fw-bold">{key}</p>
                </Card.Body>
              </Card>
            </a>
          ))}
        </div>
      </div>
      <div className={`row ${role === "USER" ? "d-none" : ""}`}>
        <div className="row m-0 mt-5">
          <div className="col-md-6">
            <h4 className="fw-bolder mb-0">Stats</h4>
          </div>
          <div className="col-auto ms-auto"></div>
        </div>
        <div className={`row mt-2 m-0 `}>
          {["user_count", "team_count", "ticket_count"].map((key) => (
            <div className="col-md-4 mt-3">
              <Card className="shadow-s">
                <Card.Body>
                  <h1 className="font-black fw-bold mb-0">{dashboard[key]}</h1>
                  <p className="mb-0 small fw-bold">{key.replace("_", " ")}</p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const statusColor = (count) => {
  if (count > 10) {
    return "text-danger";
  } else if (count > 5) {
    return "text-warning";
  } else {
    return "text-success";
  }
};

export default Dashboard;
