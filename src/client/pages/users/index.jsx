import React from "react";
import moment from "moment";

import axios from "../../utils/axios";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-auto">
          <h3>Users</h3>
        </div>
        <div className="col-auto ms-auto text-right">
          <a href="/users/create" className="btn btn-dark">
            Add User
          </a>
        </div>
      </div>
      <table className="table table-striped mt-5">
        <thead className="table-dark">
          <tr>
            <th className="text-left">First Name</th>
            <th className="text-left">Last Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Team</th>
            <th className="text-left">Created At</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.team?.name}</td>
              <td>{moment(user.createdAt).format("YYYY-MM-DD HH:mm A")}</td>
              <td>
                <a className="btn btn-danger" href={`/users/${user.id}/edit`}>
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
