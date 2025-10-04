import React, { useState } from 'react';
import "./news.css";
import {useEffect} from 'react';
import {getNews} from '../../services/newsAPI'
import {deleteNews} from '../../services/newsAPI'
export default function News() {
  const [news,Setnews]=useState([])
    useEffect(()=>{ 
      async function getasyncnews(){
        const news=await getNews()
        console.log(news.data)
        Setnews(news.data)
      }
      getasyncnews()
    },[])
    
  // State to track which card is currently hovered to show actions
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      await deleteNews(_id)
      Setnews(news.filter(item => item._id !== _id));
      setHoveredCardId(null); // Hide buttons after action
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
              <span>📅 Posted: {new Date(item.postedAt).toDateString()}</span>
              {item.eventDate && (
                <span>🎯 Event: {new Date (item.eventDate).toDateString()}</span>
              )}
              <span>👤 {item.postedBy?.name || 'Unknown'}</span>
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