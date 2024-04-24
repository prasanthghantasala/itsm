import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const CreateUser = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "",
    data: {},
  });

  const handleChange = async (type, value) => {
    setTicket({ ...ticket, [type]: value });
    try {
      await axios.put(
        "/ticket/" + id,
        {
          ...ticket,
          [type]: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Priority updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Priority update failed");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/ticket/${id}/comment`,
        {
          ticketId: id,
          comment: e.target[0].value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Comment added successfully");
      getComments();
      // reset comment input
      document.getElementById("comment").value = "";
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  };

  const getComments = async () => {
    await axios.get("/ticket/" + id + "/comment").then((res) => {
      setComments(res.data);
    });
  };

  const summarizeWithAI = async () => {
    setIsLoading(true);
    try {
      await axios
        .post("/ticket/" + id + "/summarize-with-ai", {
          prompt: customPrompt,
        })
        .then((res) => {
          setSummary(res.data.summary);
          // reset custom prompt
          document.getElementById("customPrompt").value = "";
        });
    } catch (error) {
      console.error(error);
      toast.error("Failed to summarize with AI");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await axios.get("/ticket/" + id).then((res) => {
        setTicket(res.data);
      });
      await axios.get("/users").then((res) => {
        setUsers(res.data);
      });
      await axios.get("/ticket/" + id + "/comment").then((res) => {
        setComments(res.data);
      });
    })();
  }, []);

  return (
    <div className="container">
      <div className="row m-0">
        <div className="col-md-6">
          <div className="mt-5">
            <h4 className="fw-bolder h5">View service request</h4>
            <div className=" mt-3 shadow-sm p-3 border rounded rounded-lg bg-white">
              <div className="row m-0">
                <div className="col-md-6 m-0 p-0">
                  <span>Title</span>
                  <h3 className="fw-normal">{ticket.title}</h3>
                  <span className="fs-6">Description</span>
                  <p className="fs-5 mt-0">{ticket.description}</p>
                </div>
                <div className="col-md-auto ms-auto">
                  <span className="fw-bold">Created By</span>
                  <p>
                    {ticket?.user?.firstName} {ticket?.user?.lastName}
                  </p>

                  <span className="fw-bold">Created At</span>
                  <p>
                    {moment(ticket?.createdAt).format("YYYY-MM-DD HH:mm A")}
                  </p>
                </div>
              </div>

              {/* end row */}

              <h4 className="fw-bolder h5 mt-5">Details</h4>
              <div className="">
                {Object.keys(ticket.data).map((key) => (
                  <div key={key} className="row">
                    <span className="fw-bold">{key.replace(/_/g, " ")}:</span>
                    <p>{ticket.data[key] || "N/A"}</p>
                  </div>
                ))}
              </div>

              {/* change priority */}
              <div className="row my-3">
                <div className="col-md-4">
                  <span className="fw-bold">Change priority</span>
                  <select
                    className="form-select mt-2"
                    name="priority"
                    value={ticket.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="col-md-3">
                  {/* assignedTo */}
                  <span className="fw-bold">Assigned To</span>
                  <select
                    className="form-select mt-2"
                    name="assignedTo"
                    value={ticket.assignedTo}
                    onChange={(e) => handleChange("assignedTo", e.target.value)}
                  >
                    <option value="">Select user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* status */}
                <div className="col-md-3">
                  <span className="fw-bold">Status</span>
                  <select
                    className="form-select mt-2"
                    name="status"
                    value={ticket.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="in_progress">In Progress</option>
                  </select>
                </div>
              </div>
              {/*  */}
            </div>

            {/* comments */}
          </div>
        </div>
        <div className="col-md-6 px-5 mt-5">
          <h4>Summarize with AI</h4>
          <div className="shadow-sm rounded rounded-lg border p-3 bg-white">
            <textarea
              className="form-control"
              placeholder="Enter custom prompt"
              id="customPrompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows="4"
            ></textarea>
            <button
              className="btn btn-dark mt-3"
              onClick={summarizeWithAI}
              disabled={isLoading}
            >
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              Summarize with AI
            </button>

            <div className="mt-3">
              <b>Summary generated:</b>
              <p>{summary}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 shadow-sm p-3 border rounded rounded-lg bg-white">
        <h4 className="fw-bolder h5">Comments</h4>
        <form className="mt-3" onSubmit={addComment}>
          <div className="row">
            <div className="col-md-8">
              <textarea
                className="form-control"
                name="comment"
                id="comment"
                placeholder="Enter comment"
                rows="4"
              ></textarea>
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-dark mt-3">
                Add Comment
              </button>
            </div>
          </div>
        </form>

        {/* comments map */}
        <div className="mt-3">
          {comments?.map((comment) => (
            <div key={comment.id} className="mt-3 border p-3 rounded">
              <div className="row m-0">
                <div className="col-md-9">
                  <span className="fw-bold">
                    {comment.user.firstName} {comment.user.lastName}
                  </span>
                  <p>{comment.comment}</p>
                </div>
                <div className="col-md-3">
                  <b>Created At:</b>
                  <p>
                    {moment(comment.createdAt).format("YYYY-MM-DD HH:mm A")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
