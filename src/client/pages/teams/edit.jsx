import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`/teams/${id}`);
        setTeam(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch team data");
      }
    };

    fetchTeam();
  }, [id]);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/teams/${id}`, team, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here",
        },
      });
      toast.success("Team updated successfully");
      navigate("/teams");
    } catch (error) {
      console.error(error);
      toast.error("Team update failed");
    }
  };

  return (
    <div>
      <h2 className="mt-5">Edit Team</h2>
      <p>Fill in the form below to edit the team</p>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter team name"
            value={team.name}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Update Team
        </button>
      </form>
    </div>
  );
};

export default EditTeam;
