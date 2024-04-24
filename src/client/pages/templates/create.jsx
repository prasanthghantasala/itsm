import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Createtemplate = () => {
  const navigate = useNavigate();
  const [template, settemplate] = useState({
    title: "",
    description: "",
    type: "",
    inputs: [],
  });

  const handleChange = (e) => {
    settemplate({ ...template, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/template", template, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Template created successfully");
      navigate("/templates");
    } catch (error) {
      console.error(error);
      toast.error("Template creation failed");
    }
  };

  const addInput = () => {
    settemplate({
      ...template,
      inputs: [...template.inputs, { name: "", type: "" }],
    });
  };

  return (
    <div>
      <h2 className="mt-5">Create Template</h2>
      <p>Fill in the form below to create a new template</p>
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
            value={template.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            value={template.description}
            onChange={handleChange}
          />
        </div>

        {/* type: service_request, incident */}
        <div className="mb-3">
          <label htmlFor="type" className="form-label fw-bold">
            Type
          </label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={template.type}
            onChange={handleChange}
          >
            <option value="service_request">Service Request</option>
            <option value="incident">Incident</option>
          </select>
        </div>

        {/* inputs 
        
          dynamic input add/remove
        */}
        <div className="mt-5 mb-3">
          <div className="row">
            <div className="col-auto me-auto">
              <h4>Inputs</h4>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-dark btn-sm"
                onClick={() => {
                  addInput();
                }}
              >
                Add Input
              </button>
            </div>
          </div>

          {template?.inputs?.map((input, index) => (
            <div key={index} className="row mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter input name"
                  value={input.name}
                  onChange={(e) => {
                    const newInputs = [...template.inputs];
                    newInputs[index].name = e.target.value;
                    settemplate({ ...template, inputs: newInputs });
                  }}
                />
              </div>
              <div className="col">
                <select
                  className="form-select"
                  value={input.type}
                  onChange={(e) => {
                    const newInputs = [...template.inputs];
                    newInputs[index].type = e.target.value;
                    settemplate({ ...template, inputs: newInputs });
                  }}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                </select>
              </div>
              {/* remove */}
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    const newInputs = [...template.inputs];
                    newInputs.splice(index, 1);
                    settemplate({ ...template, inputs: newInputs });
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-dark mt-5">
          Create Template
        </button>
      </form>
    </div>
  );
};

export default Createtemplate;
