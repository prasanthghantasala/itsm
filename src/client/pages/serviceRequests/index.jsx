import React from "react";
import moment from "moment";

import axios from "../../utils/axios";

const Users = () => {
  const [templates, setTemplates] = React.useState([]);
  const [filter, setFilter] = React.useState("me"); // me, all
  const [status, setStatus] = React.useState("all");

  const getTickets = (e) => {
    let filterStatus = status === "all" ? "" : `&status=${status}`;
    axios
      .get(`/ticket?type=service_requests&filter=${e}${filterStatus}`)
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilter = (filter) => {
    setFilter(filter);
    getTickets(filter);
  };

  React.useEffect(() => {
    (async () => {
      // get status from url params
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get("status");
      if (status) {
        setStatus(status);
      } else {
        setStatus("all");
      }

      await getTickets(filter);
    })();
  }, []);

  React.useEffect(() => {
    getTickets(filter);
  }, [status]);

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-auto">
          <h3>Tickets</h3>
        </div>
        <div className="col-auto ms-auto text-right">
          <a href="/service-requests/create" className="btn btn-dark">
            Create ticket
          </a>
        </div>
      </div>
      <div className="row m-0 justify-content-end mt-4">
        <div className="col-auto p-0 me-3">
          <select
            className="form-select form-select-sm"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>
        <div className="col-auto p-0">
          <button
            className="btn btn-dark btn-sm me-2"
            onClick={() => handleFilter("me")}
            disabled={filter === "me"}
          >
            My Tickets
          </button>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => handleFilter("all")}
            disabled={filter === "all"}
          >
            All Tickets
          </button>
        </div>
      </div>
      <table className="table table-striped mt-2">
        <thead className="table-dark">
          <tr>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-left">Type</th>
            <th className="text-left">Status</th>
            <th className="text-left">Created At</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates?.map((template) => (
            <tr key={template.id}>
              <td>
                {template.title.substring(0, 50) +
                  `${template?.title?.length > 50 ? "..." : ""}`}
              </td>
              <td>
                {template.description.substring(0, 50) +
                  `${template?.description?.length > 50 ? "..." : ""}`}
              </td>
              <td>{template.type?.replace(/_/g, " ")}</td>
              <td>{template.status?.replace(/_/g, " ")}</td>
              <td>
                {moment(template?.createdAt).format("YYYY-MM-DD HH:mm A")}
              </td>
              <td>
                <a
                  className="btn btn-danger"
                  href={`/service-requests/${template.id}/edit`}
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
