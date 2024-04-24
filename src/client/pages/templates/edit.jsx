import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [template, setTemplate] = useState({
    title: "",
    description: "",
    inputs: [],
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`/template/${id}`);
        setTemplate(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch template");
      }
    };

    fetchTemplate();
  }, [id]);

  const handleChange = (e) => {
    setTemplate({ ...template, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/template/${id}`, template, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here", // replace with your token
        },
      });
      toast.success("Template updated successfully");
      navigate("/templates");
    } catch (error) {
      console.error(error);
      toast.error("Template update failed");
    }
  };

  const addInput = () => {
    setTemplate({
      ...template,
      inputs: [...template.inputs, { name: "", type: "" }],
    });
  };

  useEffect(() => {
    (() => {
      axios.get("/template").then((res) => {
        setTemplates(res.data);
        setTemplate(res.data[0]);
      });
    })();
  }, []);

  return (
    <div>
      <h2 className="mt-5">Edit Template</h2>
      <p>Fill in the form below to edit the template</p>
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

        <div className="mt-3">
          <div className="d-flex justify-content-between">
            <label htmlFor="inputs" className="form-label fw-bold">
              Inputs
            </label>
            <div>
              <button type="button" className="btn btn-dark" onClick={addInput}>
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
                    setTemplate({ ...template, inputs: newInputs });
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
                    setTemplate({ ...template, inputs: newInputs });
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
                    setTemplate({ ...template, inputs: newInputs });
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-dark mt-5">
          Update Template
        </button>
      </form>
    </div>
  );
};

export default EditTemplate;
