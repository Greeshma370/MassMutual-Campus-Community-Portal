import React, { useState } from 'react';
import "./news.css";

// Initial data structure (kept outside the component for clean state initialization)
const initialNewsData = [
  {
    _id: "1",
    title: "Campus Placement Drive by Infosys",
    description: "Infosys is conducting a placement drive for final year students. Eligible branches: CSE, IT, ECE. Last date to apply: 30th Sept.",
    type: "drive",
    postedAt: new Date("2025-09-20"),
    eventDate: new Date("2025-10-01"),
    postedBy: { name: "Placement Faculty" },
  },
  {
    _id: "2",
    title: "AI Workshop",
    description: "A hands-on workshop on Artificial Intelligence and Machine Learning will be conducted in the auditorium.",
    type: "event",
    postedAt: new Date("2025-09-15"),
    eventDate: new Date("2025-09-28"),
    postedBy: { name: "Management" },
  },
  {
    _id: "3",
    title: "Library Timings Extended",
    description: "The central library will now remain open till 9 PM on weekdays to support students during exam preparation.",
    type: "news",
    postedAt: new Date("2025-09-10"),
    postedBy: { name: "Faculty" },
  },
];

export default function News() {
  const [news, setNews] = useState(initialNewsData);
  // State to track which card is currently hovered to show actions
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setNews(news.filter(item => item._id !== _id));
      setHoveredCardId(null); // Hide buttons after action
    }
  };

  const handleEdit = (_id) => {
    console.log(`Edit button clicked for item with ID: ${_id}`);
    alert(`Functionality to edit item ${_id} will be implemented here.`);
  };
  
  

  return (
    <div className="news-container">
      <h2>Announcements</h2>

      

      <div className="news-list">
        {news.map((item) => (
          <div 
            key={item._id} 
            className={`news-card ${item.type}`}
            // Set hoveredCardId when mouse enters
            onMouseEnter={() => setHoveredCardId(item._id)}
            // Reset hoveredCardId when mouse leaves
            onMouseLeave={() => setHoveredCardId(null)}
          >
            <div className="news-header">
              <h3>{item.title}</h3>
              <span className={`tag ${item.type}`}>{item.type}</span>
            </div>
            
            <p>{item.description}</p>
            
            <div className="news-meta">
              <span>📅 Posted: {item.postedAt.toDateString()}</span>
              {item.eventDate && (
                <span>🎯 Event: {item.eventDate.toDateString()}</span>
              )}
              <span>👤 {item.postedBy.name}</span>
            </div>
            
            {/* --- THREE DOTS AND CONDITIONAL ACTIONS --- */}
            <div className="action-control-area">
                <button 
                    className="dots-btn" 
                    // Toggles action visibility on click (for mobile/better UX)
                    onClick={() => setHoveredCardId(hoveredCardId === item._id ? null : item._id)}
                >
                    •••
                </button>
                
                {/* Conditionally render actions when hoveredCardId matches */}
                {(hoveredCardId === item._id) && (
                    <div className="news-actions">
                        <button className="action-btn edit-btn" onClick={() => handleEdit(item._id)}>
                            Edit
                        </button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(item._id)}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}