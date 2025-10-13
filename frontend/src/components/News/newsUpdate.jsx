import React, { useState, useEffect } from 'react';
import { getNews, deleteNews } from '../../services/newsAPI';
import "./news.css";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      const response = await getNews();
      setNews(response.data || []);
    }
    fetchNews();
  }, []);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      await deleteNews(_id);
      setNews(news.filter(item => item._id !== _id));
    }
  };

  return (
    <div className="news-container">
      <h2>Announcements</h2>
      <div className="news-list">
        {news.map((item) => (
          <div
            key={item._id}
            className={`news-card ${item.type}`}
            onMouseEnter={() => setHoveredCardId(item._id)}
            onMouseLeave={() => setHoveredCardId(null)}
          >
            <div className="news-header">
              <h3>{item.title}</h3>
              <span className={`tag ${item.type}`}>{item.type}</span>
            </div>
            <p className="news-description">{item.description}</p>
            <div className="news-meta">
              <span>📅 Posted: {item.postedAt ? new Date(item.postedAt).toDateString() : 'TBA'}</span>
              {item.eventDate && <span>🎯 Event: {new Date(item.eventDate).toDateString()}</span>}
              <span>👤 {item.postedBy?.name || 'Unknown'}</span>
            </div>
            <div className="action-control-area">
              <button
                className="dots-btn"
                onClick={() => setHoveredCardId(hoveredCardId === item._id ? null : item._id)}
              >
                •••
              </button>
              {hoveredCardId === item._id && (
                <div className="news-actions">
                  <button className="action-btn delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
