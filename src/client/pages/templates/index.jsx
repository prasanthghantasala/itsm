import React from "react";
import moment from "moment";

import axios from "../../utils/axios";

const Users = () => {
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/template")
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-auto">
          <h3>Templates</h3>
        </div>
        <div className="col-auto ms-auto text-right">
          <a href="/templates/create" className="btn btn-dark">
            Add Template
          </a>
        </div>
      </div>
      <table className="table table-striped mt-5">
        <thead className="table-dark">
          <tr>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-left">Type</th>
            <th className="text-left">Created At</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>
                {template.title.substring(0, 50) +
                  `${template.title.length > 50 ? "..." : ""}`}
              </td>
              <td>
                {template.description.substring(0, 50) +
                  `${template.description.length > 50 ? "..." : ""}`}
              </td>
              <td>{template.type.replace(/_/g, " ")}</td>
              <td>{moment(template.createdAt).format("YYYY-MM-DD HH:mm A")}</td>
              <td>
                <a
                  className="btn btn-danger"
                  href={`/templates/${template.id}/edit`}
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
