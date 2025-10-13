import React, { useEffect, useState } from "react";
import { getNews } from "../../services/newsAPI";
import "./news.css";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await getNews();
        setNews(response.data || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2>Announcements</h2>
      <div className="news-list">
        {news.map((item) => (
          <div key={item._id} className={`news-card ${item.type}`}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
