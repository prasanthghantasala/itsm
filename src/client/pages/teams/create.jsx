import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/teams", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("User created successfully");
      navigate("/teams");
    } catch (error) {
      console.error(error);
      toast.error("User creation failed");
    }
  };

  return (
    <div>
      <h2 className="mt-5">Create Team</h2>
      <p>Fill in the form below to create a new team</p>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label fw-bold">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter team name"
            value={user.name}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
