import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./uploadNews.css";
import { createNews } from "../../services/newsAPI";
import { useAuth } from "../../context/AuthContext";

export default function NewsForm() {
  const navigate = useNavigate();
  const Auth = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("news");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      type,
      ...(eventDate ? { eventDate } : {}),
    };

    setLoading(true);
    try {
      await createNews(payload);
      setSuccess("✅ Posted successfully!");
      setTitle("");
      setDescription("");
      setType("news");
      setEventDate("");

      setTimeout(() => {
        if (Auth.role === "faculty") {
          navigate("/dashboard/faculty");
        } else {
          navigate("/dashboard/management");
        }
      }, 1000);
    } catch (err) {
      setError(err?.response?.data?.message || "❌ Failed to post news/event.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setType("news");
    setEventDate("");
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="upload-news-container">
      <form className="news-form" onSubmit={handleSubmit}>
        <h2>Create News / Event / Drive</h2>
      <button
        type="button"
        className="close-btn1"
        onClick={() => {
          if (Auth.role === "faculty") {
            navigate("/dashboard/faculty");
          } else {
            navigate("/dashboard/management");
          }
        }}
      >
        X
      </button>
        {error && <div className="nf-message nf-error">{error}</div>}
        {success && <div className="nf-message nf-success">{success}</div>}

        <label>
          Title  *
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </label>

        <label>
          Description *
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief description..."
            rows={5}
            required
          />
        </label>

        <div className="form-row">
          <label>
            Type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="news">News</option>
              <option value="event">Event</option>
              <option value="drive">Drive</option>
            </select>
          </label>

          <label>
            Event Date
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </label>
        </div>

        <div className="nf-actions">
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
          <button type="button" className="btn secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
