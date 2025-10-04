import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./uploadNews.css";
import { createNews } from "../../services/newsAPI";
import { useAuth } from "../../context/AuthContext";

export default function NewsForm() {
  const navigate = useNavigate();
  const Auth=useAuth()
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
      // only send eventDate if the user provided one
      ...(eventDate ? { eventDate } : {}),
    };

    setLoading(true);
    try {
      const res=createNews(payload)
      console.log(res)

      setSuccess("Posted successfully.");
      setTitle("");
      setDescription("");
      setType("news");
      setEventDate("");
      // navigate back to a dashboard or list if desired:
      // navigate("/dashboard/faculty");
      if (Auth.role=='faculty'){
        navigate("/dashboard/faculty")
      }
      else{
        navigate("/dashboard/management")
      }
    } catch (err) {
      setError(err.message || "Failed to post news/event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="news-form" onSubmit={handleSubmit}>
      <h3>Create News / Event / Drive</h3>

      {error && <div className="nf-error">{error}</div>}
      {success && <div className="nf-success">{success}</div>}

      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows={6}
          required
        />
      </label>

      <label className="nf-inline">
        Type
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="news">News</option>
          <option value="event">Event</option>
          <option value="drive">Drive</option>
        </select>
      </label>

      <label>
        Event Date (optional)
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </label>

      <div className="nf-actions">
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
        <button
          type="button"
          className="btn outline"
          onClick={() => {
            setTitle("");
            setDescription("");
            setType("news");
            setEventDate("");
            setError(null);
            setSuccess(null);
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}