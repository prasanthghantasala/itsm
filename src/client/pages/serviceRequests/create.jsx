import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState({});
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "",
    data: {},
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/ticket", ticket, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Template created successfully");
      navigate("/service-requests");
    } catch (error) {
      console.error(error);
      toast.error("Template creation failed");
    }
  };

  useEffect(() => {
    (async () => {
      await axios.get("/template").then((res) => {
        setTemplates(res.data);
        setTemplate(res.data[0]);
      });
    })();
  }, []);

  return (
    <div>
      <h2 className="mt-5">Create service ticket</h2>
      <p>Fill in the form below to create a new service ticket</p>

      <div className="mt-4">
        <p>Select a template from the dropdown </p>
        <select
          className="form-select"
          id="template"
          name="template"
          value={template.id}
          onChange={(e) =>
            setTemplate(templates.find((t) => t.id === e.target.value))
          }
        >
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
            value={ticket.title}
            onChange={handleChange}
          />
        </div>
        {/* description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            value={ticket.description}
            onChange={handleChange}
          />
        </div>

        {/* priority: high, medium, low */}
        <div className="mb-3">
          <label htmlFor="type" className="form-label fw-bold">
            Priority
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {template.inputs &&
          template.inputs.map((input) => (
            <div key={input.name} className="mb-3">
              <label htmlFor={input.name} className="form-label fw-bold">
                {input.name.replace(/_/g, " ")}
              </label>
              <input
                type="text"
                className="form-control"
                id={input.name}
                name={input.name}
                placeholder={`Enter ${input.name.replace(/_/g, " ")}`}
                value={ticket.data[input.name]}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    data: { ...ticket.data, [input.name]: e.target.value },
                  })
                }
              />
            </div>
          ))}

        <button type="submit" className="btn btn-dark mt-5">
          Create Service Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
