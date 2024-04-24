import React from "react";
import moment from "moment";

import axios from "../../utils/axios";

const Users = () => {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-auto">
          <h3>Teams</h3>
        </div>
        <div className="col-auto ms-auto text-right">
          <a href="/teams/create" className="btn btn-dark">
            Add Team
          </a>
        </div>
      </div>
      <table className="table table-striped mt-5">
        <thead className="table-dark">
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">Name</th>
            <th className="text-left">Created At</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{moment(team.createdAt).format("YYYY-MM-DD HH:mm A")}</td>
              <td>
                <a className="btn btn-danger" href={`/teams/${team.id}/edit`}>
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
